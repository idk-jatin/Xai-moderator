from app.models.distilbert import predict_db
from app.models.bilstm import predict_bi
from app.models.tfidf import predict_tf

from app.explain import word_attention
from app.ensemble import soft_vote, hard_vote


def analyze_all(text: str):
    results = {}

    bert = predict_db(text)
    words, scores = word_attention(bert["attentions"], bert["input_ids"], text)
    results["distilbert"] = {
        "label": bert["label"],
        "probabilities": bert["probabilities"],
        "words": words,
        "attentions": scores,
    }

    tfidf = predict_tf(text)
    results["tfidf"] = tfidf

    bilstm = predict_bi(text)
    results["bilstm"] = bilstm

    labels = [tfidf["label"], bilstm["label"], bert["label"]]

    hard = hard_vote(labels)
    soft, avg_prob = soft_vote(
        tfidf["probabilities"], bilstm["probabilities"], bert["probabilities"]
    )

    results["ensemble"] = {"hard": hard, "soft": soft, "avg_prob": avg_prob}

    return results
