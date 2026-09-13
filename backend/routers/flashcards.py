from fastapi import APIRouter
from pydantic import BaseModel
from services.chroma_service import collection
from services.gemini_service import ask_gemini
import json

router = APIRouter()


class FlashcardRequest(BaseModel):
    filename: str


@router.post("/flashcards")
def generate_flashcards(data: FlashcardRequest):

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
Create 15 flashcards from these notes.

Return ONLY valid JSON.

Example:

{{
  "flashcards": [
    {{
      "front": "Who created Python?",
      "back": "Guido van Rossum"
    }},
    {{
      "front": "When was Python released?",
      "back": "1991"
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

        return json.loads(
            response
        )

    except Exception as e:

        return {
            "error": str(e),
            "raw_response": response
        }