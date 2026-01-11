from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from .inference import predict
from .explain import word_level_attention


app = FastAPI(title="Xai Moderator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class TextRequest(BaseModel):
    text: str

@app.get("/")
def health():
    return {"status": "Xai Moderator running"}

@app.post("/analyze")
def analyze(req: TextRequest):
    result = predict(req.text)

    words, scores = word_level_attention(
        result["attentions"],
        result["input_ids"],
        req.text
    )

    return {
        "label": result["label"],
        "probabilities": result["probabilities"],
        "words": words,
        "attention": scores
    }

