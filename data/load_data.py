from datasets import load_dataset

def load_hatexplain():
    dataset = load_dataset("Hate-speech-CNERG/hatexplain", trust_remote_code=True)
    return dataset

if __name__ == "__main__":
    ds = load_hatexplain()
    print(ds)
    print(ds["train"][824])