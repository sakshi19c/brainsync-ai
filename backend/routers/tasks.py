from fastapi import APIRouter
from pydantic import BaseModel
from services.gemini_service import ask_gemini
import json

router = APIRouter()


class TaskRequest(BaseModel):
    goal: str


@router.post("/tasks")
def generate_tasks(data: TaskRequest):

    prompt = f"""
Create a study plan for:

{data.goal}

Return ONLY valid JSON.

Example:

{{
  "tasks": [
    {{
      "task": "Learn Python Basics",
      "priority": "High",
      "estimated_time": "1 week"
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

        return json.loads(response)

    except Exception as e:
        return {
            "error": str(e),
            "raw_response": response
        }