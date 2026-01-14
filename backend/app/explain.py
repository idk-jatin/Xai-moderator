import numpy as np
from transformers import AutoTokenizer
from pathlib import Path

base_dir = Path(__file__).resolve().parents[2]
model_path = str(base_dir / "models" / "distilbert" / "final_model")

tokenizer = AutoTokenizer.from_pretrained(model_path)

special = {"[CLS]", "[SEP]", "[PAD]"}


def word_attention(attentions, input_ids, text):

    attn = attentions[-1].mean(dim=1)[0]
    cls_attn = attn[0].cpu().numpy()

    tokens = tokenizer.convert_ids_to_tokens(input_ids.tolist())
    words = [w.strip(".,!?;:()[]{}\"'").lower() for w in text.split()]

    special = {"[CLS]", "[SEP]", "[PAD]"}

    word_scores = []
    clean_words = []

    curr = ""
    curr_scores = []
    word_idx = 0

    for tok, score in zip(tokens, cls_attn):
        if tok in special:
            continue

        tok = tok.replace("##", "")
        curr += tok
        curr_scores.append(score)

        if word_idx < len(words) and curr.lower() == words[word_idx]:
            clean_words.append(words[word_idx])
            word_scores.append(float(np.mean(curr_scores)))
            curr = ""
            curr_scores = []
            word_idx += 1

    if len(word_scores) > 0:
        mx = max(word_scores)
        word_scores = [s / mx for s in word_scores]

    return clean_words, word_scores
