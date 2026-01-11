import torch
import numpy as np
from .model import model, tokenizer, device

id2label = {0:"hatespeech", 1:"normal", 2:"offensive"}

def predict(text: str):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        max_length=160
    )

    inputs = {k:v.to(device) for k,v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    probs = torch.softmax(logits, dim=1)[0].cpu().numpy()
    pred_id = int(torch.argmax(logits, dim=1))

    return {
        "label": id2label[pred_id],
        "probabilities": {
            id2label[i]: float(probs[i]) for i in range(3)
        },
        "attentions": outputs.attentions,
        "input_ids": inputs["input_ids"][0]
    }
