from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import ask_gemini
import json

router = APIRouter()


class RoadmapRequest(BaseModel):
    goal: str


@router.post("/roadmap")
def generate_roadmap(data: RoadmapRequest):

    prompt = f"""
Create a learning roadmap for:

{data.goal}

Return ONLY valid JSON.

Example:

{{
  "roadmap": [
    {{
      "step": "Learn Excel",
      "duration": "2 weeks"
    }},
    {{
      "step": "Learn SQL",
      "duration": "3 weeks"
    }}
  ]
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

        roadmap_data = json.loads(
            response
        )

        return roadmap_data

    except Exception as e:

        return {
            "error": "Failed to parse Gemini response",
            "details": str(e),
            "raw_response": response
        }