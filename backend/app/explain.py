import numpy as np
from .model import tokenizer

SPECIAL = {"[CLS]", "[SEP]", "[PAD]"}

def word_level_attention(attentions, input_ids, original_text):
    attn = attentions[-1].mean(dim=1)[0]
    cls_attn = attn[0].cpu().numpy()

    tokens = tokenizer.convert_ids_to_tokens(input_ids)
    words = original_text.split()

    word_scores = []
    clean_words = []

    current_word = ""
    current_scores = []

    word_idx = 0

    for tok, score in zip(tokens, cls_attn):
        if tok in SPECIAL:
            continue

        tok = tok.replace("##", "")
        current_word += tok
        current_scores.append(score)

        if word_idx < len(words) and current_word.lower() == words[word_idx].lower():
            clean_words.append(words[word_idx])
            word_scores.append(float(np.mean(current_scores)))
            current_word = ""
            current_scores = []
            word_idx += 1

    # normalize
    if len(word_scores) > 0:
        mx = max(word_scores)
        word_scores = [s / mx for s in word_scores]

    return clean_words, word_scores
