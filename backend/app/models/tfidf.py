import joblib
import numpy as np
from pathlib import Path

base_dir = Path(__file__).resolve().parents[3]
model_path = base_dir / "models" / "tfidf" / "tfidf_logreg.pkl"
label = ["hatespeech", "normal", "offensive"]

pipeline = joblib.load(model_path)


def top_keywords(text, top_k=8):
    tfidf = pipeline.named_steps["tfidf"]
    clf = pipeline.named_steps["clf"]

    X = tfidf.transform([text])
    feature_names = tfidf.get_feature_names_out()

    probs = clf.predict_proba(X)[0]
    pred_id = int(np.argmax(probs))

    class_weights = clf.coef_[pred_id]
    tfidf_values = X.toarray()[0]

    contributions = tfidf_values * class_weights

    top_idx = np.argsort(contributions)[-top_k:][::-1]

    keywords = [
        {"word": feature_names[i], "score": float(contributions[i])}
        for i in top_idx
        if tfidf_values[i] > 0
    ]

    return keywords


def predict_tf(text: str):
    probs = pipeline.predict_proba([text])[0]
    pred_id = int(np.argmax(probs))
    keywords = top_keywords(text)

    return {
        "label": label[pred_id],
        "probabilities": {label[i]: float(probs[i]) for i in range(len(label))},
        "keywords": keywords,
    }
