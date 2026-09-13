from fastapi import APIRouter
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.get("/dashboard")
def get_dashboard():

    pdf_count = 0

    if os.path.exists(UPLOAD_FOLDER):
        pdf_count = len(
            [
                file
                for file in os.listdir(
                    UPLOAD_FOLDER
                )
                if file.endswith(".pdf")
            ]
        )

    return {
        "documents": pdf_count,
        "status": "active"
    }