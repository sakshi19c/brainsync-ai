from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.gemini_service import ask_gemini
from services.pdf_service import extract_pdf_text

from routers.upload import router as upload_router
from routers.chat import router as chat_router
from routers.graph import router as graph_router
from routers.roadmap import router as roadmap_router
from routers.recommendations import router as recommendations_router
from routers.dashboard import router as dashboard_router
from routers.quiz import router as quiz_router
from routers.flashcards import router as flashcards_router
from routers.tasks import router as tasks_router

import os

app = FastAPI(title="BrainSync AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(graph_router)
app.include_router(roadmap_router)
app.include_router(recommendations_router)
app.include_router(dashboard_router)
app.include_router(quiz_router)
app.include_router(flashcards_router)
app.include_router(tasks_router)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@app.get("/")
def home():
    return {
        "message": "BrainSync AI Backend Running"
    }

@app.get("/test-ai")
def test_ai():
    return {
        "response": ask_gemini(
            "Explain Python in 50 words"
        )
    }

@app.get("/files")
def get_files():

    files = []

    for file in os.listdir(
        UPLOAD_FOLDER
    ):
        if file.endswith(".pdf"):
            files.append({
                "name": file
            })

    return files

@app.get("/summary/{filename}")
def get_summary(
    filename: str
):

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    if not os.path.exists(
        filepath
    ):
        return {
            "error": "File not found"
        }

    text = extract_pdf_text(
        filepath
    )

    summary = ask_gemini(
        f"""
Summarize these notes in bullet points.

{text[:10000]}
"""
    )

    return {
        "filename": filename,
        "summary": summary
    }

@app.delete("/delete/{filename}")
def delete_file(
    filename: str
):

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    if not os.path.exists(
        filepath
    ):
        return {
            "error": "File not found"
        }

    os.remove(
        filepath
    )

    return {
        "message": f"{filename} deleted"
    }