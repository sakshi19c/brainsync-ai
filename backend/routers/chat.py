from fastapi import APIRouter
from pydantic import BaseModel

from services.embedding_service import (
    create_embedding
)

from services.chroma_service import (
    collection
)

from services.gemini_service import (
    ask_gemini
)

router = APIRouter()

class ChatRequest(BaseModel):
    question: str
    filename: str

@router.post("/chat")
def chat(data: ChatRequest):

    query_embedding = create_embedding(
        data.question
    )

    results = collection.query(
        query_embeddings=[
            query_embedding
        ],
        n_results=5,
        where={
            "file": data.filename
        }
    )

    documents = results.get(
        "documents",
        [[]]
    )

    if not documents[0]:
        return {
            "answer": "No information found in the selected PDF."
        }

    context = "\n".join(
        documents[0]
    )

    prompt = f"""
Context:
{context}

Question:
{data.question}

Answer using only the context.
"""

    answer = ask_gemini(
        prompt
    )

    return {
        "answer": answer
    }