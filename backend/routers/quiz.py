from fastapi import APIRouter
from pydantic import BaseModel
from services.chroma_service import collection
from services.gemini_service import ask_gemini
import json

router = APIRouter()

class QuizRequest(BaseModel):
    filename: str


@router.post("/quiz")
def generate_quiz(data: QuizRequest):

    results = collection.get(
        where={"file": data.filename}
    )

    documents = results.get(
        "documents",
        []
    )

    if not documents:
        return {
            "error": "Document not found"
        }

    full_text = "\n".join(
        documents
    )

    prompt = f"""
Create 10 multiple choice questions from these notes.

Return ONLY valid JSON.

Example:

{{
  "questions":[
    {{
      "question":"Who created Python?",
      "options":[
        "James Gosling",
        "Guido van Rossum",
        "Dennis Ritchie",
        "Bjarne Stroustrup"
      ],
      "answer":"Guido van Rossum"
    }}
  ]
}}

Notes:

{full_text[:8000]}
"""

    response = ask_gemini(prompt)

    try:

        response = response.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

        return json.loads(response)

    except Exception as e:

        return {
            "error": str(e),
            "raw_response": response
        }