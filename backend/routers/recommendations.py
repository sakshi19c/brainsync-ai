from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import ask_gemini
import json

router = APIRouter()


class RecommendationRequest(BaseModel):
    goal: str


@router.post("/recommendations")
def generate_recommendations(data: RecommendationRequest):

    prompt = f"""
Based on this goal:

{data.goal}

Recommend:

1. Skills to learn
2. Projects to build
3. Books to read
4. Courses to take

Return ONLY valid JSON.

Example:

{{
  "skills": ["Python", "SQL"],
  "projects": ["Sales Dashboard"],
  "books": ["Python Crash Course"],
  "courses": ["Google Data Analytics"]
}}
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