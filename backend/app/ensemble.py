from collections import Counter

label = ["hatespeech", "normal", "offensive"]


def hard_vote(labels):
    return Counter(labels).most_common(1)[0][0]


def soft_vote(db_probs, tf_probs, bi_probs):
    w_db, w_tf, w_bi = 0.6, 0.3, 0.1
    avg = {k: 0.0 for k in label}
    for k in avg:
        avg[k] = (w_db * db_probs[k] + w_tf * tf_probs[k] + w_bi * bi_probs[k]) / (w_db + w_tf + w_bi)
    final = max(avg, key=avg.get)
    return final, avg
