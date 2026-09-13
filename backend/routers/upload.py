from fastapi import APIRouter, UploadFile, File
from services.pdf_service import (
    extract_pdf_text,
    chunk_text
)
from services.embedding_service import (
    create_embedding
)
from services.chroma_service import (
    collection
)

import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(filepath, "wb") as f:
        f.write(
            await file.read()
        )

    text = extract_pdf_text(
        filepath
    )

    chunks = chunk_text(
        text
    )

    for i, chunk in enumerate(
        chunks
    ):

        embedding = create_embedding(
            chunk
        )

        collection.add(
            ids=[
                f"{file.filename}_{i}"
            ],
            documents=[
                chunk
            ],
            embeddings=[
                embedding
            ],
            metadatas=[
                {
                    "file": file.filename
                }
            ]
        )

    return {
        "filename": file.filename,
        "characters": len(text),
        "chunks_stored": len(chunks)
    }