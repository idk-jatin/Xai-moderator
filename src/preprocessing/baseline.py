import re
from nltk.corpus import stopwords
from emoji import demojize
import pandas as pd

Stop_Words = set(stopwords.words("english")) - {"not", "no", "nor", "never"}


def baseline_preprocessing(text: str) -> str:

    text = text.lower()

    text = text.replace("<user>", " USER ")
    text = text.replace("<number>", " ")

    text = re.sub(r"\b\d+\b", " ", text)

    text = demojize(text, delimiters=(" ", " "))
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    tokens = text.split()
    tokens = [t for t in tokens if t not in Stop_Words]
    return " ".join(tokens)


def csv_preprocess(input, to_save):
    df = pd.read_csv(input)
    df["text"] = df["text"].astype(str).apply(baseline_preprocessing)
    bs_df = df[["post_id", "source", "text", "label"]]
    bs_df.to_csv(to_save, index=False)


if __name__ == "__main__":
    csv_preprocess("data/raw/train.csv", "data/baseline/train_base.csv")
    csv_preprocess("data/raw/test.csv", "data/baseline/test_base.csv")
    csv_preprocess("data/raw/val.csv", "data/baseline/val_base.csv")
