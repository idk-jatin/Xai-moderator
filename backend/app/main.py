from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.controller import analyze_all

app = FastAPI(title="XAI Moderator API")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"], allow_credentials=True
)

class TextRequest(BaseModel):
    text: str

@app.get("/")
def health():
    return {"status": "XAI Moderator running"}

@app.post("/analyze")
def analyze(req: TextRequest):
    return analyze_all(req.text)