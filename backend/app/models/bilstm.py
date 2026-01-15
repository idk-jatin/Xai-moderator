import torch
import torch.nn as nn
import torch.nn.functional as F
import pickle
from pathlib import Path

base_dir = Path(__file__).resolve().parents[3]
model_dir = base_dir / "models" / "bilstm"
vocab_path = model_dir / "vocab.pkl"
model_path = model_dir / "bilstm_model.pt"
label = ["hatespeech", "normal", "offensive"]
device = "cuda" if torch.cuda.is_available() else "cpu"

class BiLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim=100, hidden_dim=128, num_classes=3):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True, bidirectional=True)
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim * 2, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes),
        )

    def forward(self, x):
        emb = self.embedding(x)
        out, _ = self.lstm(emb)
        mask = (x != 0).unsqueeze(-1)   # 0 = <PAD>
        out = out * mask
        out = out.sum(dim=1) / mask.sum(dim=1)
        out = self.fc(out)
        return out


with open(vocab_path, "rb") as f:
    vocab = pickle.load(f)

vocab_size = len(vocab)
max_len = 100


model = BiLSTM(vocab_size=vocab_size)

model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()


def encode(text: str):
    tokens = text.lower().split()
    ids = [vocab.get(t, vocab["<UNK>"]) for t in tokens][:max_len]
    return ids + [vocab["<PAD>"]] * (max_len - len(ids))


def predict_bi(text: str):
    ids = encode(text)
    x = torch.tensor(ids).unsqueeze(0).to(device)
    with torch.no_grad():
        logits = model(x)
    probs = F.softmax(logits/2.0, dim=1)[0].cpu().numpy()
    pred_id = int(torch.argmax(logits, dim=1))

    return {
        "label": label[pred_id],
        "probabilities": {label[i]: float(probs[i]) for i in range(len(label))},
    }