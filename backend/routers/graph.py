from fastapi import APIRouter
from pydantic import BaseModel
from services.chroma_service import collection
from services.gemini_service import ask_gemini
import json

router = APIRouter()


class GraphRequest(BaseModel):
    filename: str


@router.post("/graph")
def generate_graph(data: GraphRequest):

    try:
        results = collection.get(
            where={"file": data.filename}
        )

        documents = results.get(
            "documents",
            []
        )

        if not documents:
            return {
                "nodes": [],
                "edges": [],
                "error": "No document found"
            }

        full_text = "\n".join(
            documents
        )

        prompt = f"""
Analyze these study notes.

Create a simple knowledge graph.

Rules:
1. Return ONLY valid JSON.
2. Maximum 25 nodes.
3. Maximum 35 edges.
4. Use short concept names.
5. No explanations.

Format:

{{
  "nodes": [
    {{
      "id": "Python"
    }}
  ],
  "edges": [
    {{
      "source": "Python",
      "target": "Variables"
    }}
  ]
}}

Notes:

{full_text[:8000]}
"""

        response = ask_gemini(prompt)

        response = (
            response
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        graph_data = json.loads(
            response
        )

        nodes = graph_data.get(
            "nodes",
            []
        )

        edges = graph_data.get(
            "edges",
            []
        )

        # Limit size for frontend
        nodes = nodes[:25]
        edges = edges[:35]

        return {
            "nodes": nodes,
            "edges": edges
        }

    except Exception as e:
        return {
            "nodes": [],
            "edges": [],
            "error": str(e)
        }