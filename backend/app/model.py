import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_path = "../models/distilbert/final_model"

device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path,output_attentions=True)

model.to(device)
model.eval()
