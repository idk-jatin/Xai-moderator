import csv
from collections import Counter
from load_data import load_hatexplain

label_map = {0: "hatespeech", 1: "normal", 2: "offensive"}


def major_vote(values):
    return Counter(values).most_common(1)[0][0]


def agg_rationales(rationales,num_tokens):
    if not rationales:
        return [0] * num_tokens
     
    agg = []
    for i in range(len(rationales[0])):
        count = sum(rat[i] for rat in rationales)
        agg.append(1 if count >= 2 else 0)

    return agg


def to_csv(split, path):
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["post_id", "source", "text", "label", "targets", "rationale"])

        for ex in split:
            post_id = ex["id"]
            source = "gab" if post_id.endswith("_gab") else "twitter"
            tokens = ex["post_tokens"]
            text = " ".join(tokens)
            labels = ex["annotators"]["label"]
            label = label_map[major_vote(labels)]
            targets = sorted(set(t for targ_list in ex["annotators"]["target"] for t in targ_list))
            rationale = agg_rationales(ex["rationales"],len(ex["post_tokens"]))

            writer.writerow(
                [
                    post_id,
                    source,
                    text,
                    label,
                    "|".join(targets),
                    " ".join(map(str, rationale)),
                ]
            )


if __name__ == "__main__":
    dataset = load_hatexplain()
    to_csv(dataset["train"], "data/raw/train.csv")
    to_csv(dataset["validation"], "data/raw/val.csv")
    to_csv(dataset["test"], "data/raw/test.csv")
