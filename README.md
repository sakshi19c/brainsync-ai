# 🧠 BrainSync AI

BrainSync AI is an AI-powered Second Brain that helps users upload notes, chat with PDFs, generate summaries, and visualize knowledge using interactive graphs.

---

# ⚙️ Installation & Setup

## 1. Clone Repository
git clone <repository-url>
cd brainsync-ai

---

## 2. Backend Setup (FastAPI)

cd backend
pip install -r requirements.txt

If requirements file is missing:
pip install fastapi uvicorn google-generativeai chromadb sentence-transformers pypdf python-multipart numpy torch transformers

Run backend only:
uvicorn main:app --reload

Backend runs at:
http://127.0.0.1:8000

---

## 🔑 API Key Setup (IMPORTANT)

You must add your Gemini API key before running AI features.

### Step 1:
Open this file:
backend/services/gemini_service.py

### Step 2:
Find this line:
GEMINI_API_KEY = "YOUR_API_KEY_HERE"

### Step 3:
Replace it with your key:
GEMINI_API_KEY = "your_actual_api_key"

👉 Get API key from:
https://aistudio.google.com/

---

## 3. Frontend Setup (Next.js)

cd ../brainsync-ai
npm install

Install React Flow:
npm install @xyflow/react

Run frontend only:
npm run dev

Frontend runs at:
http://localhost:3000

---

## 4. Run Full Project (Frontend + Backend Together)

From ROOT folder:
npm install concurrently
npm run dev

---

# 🔗 API Endpoints

Upload PDF:
POST /upload

Chat with Notes:
POST /chat

Get Summary:
GET /summary/{filename}

List Files:
GET /files

Delete File:
DELETE /delete/{filename}

---

# 🧠 How to Use

- Upload PDF notes in the app
- Chat with uploaded notes using AI
- Get automatic summaries
- View knowledge graphs in /graph
- Drag and connect nodes in graph
- Use /settings to toggle preferences

---

# ⚠️ Notes

- First run may take time due to AI model loading
- Uploaded files are stored in /uploads
- Backend uses FastAPI
- React Flow is required for graph feature
- Without API key, AI features will not work

---

# 🚀 Done

BrainSync AI is now ready to run locally as a full AI-powered learning assistant."# brainsync-ai" 
