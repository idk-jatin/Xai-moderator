# Explainable AI Moderator

This project explores explainable hate speech detection using modern NLP models. The primary objective is not only to classify potentially harmful text but also to provide transparency into how the model arrives at its predictions. The system combines classical machine learning baselines, neural sequence models, and transformer-based architectures, along with a simple full-stack interface for interactive analysis.

The work was developed as part of an academic project focused on responsible AI, explainability, and practical deployment of NLP moderation systems.

---

## Project Overview

Content moderation models often operate as black boxes, producing predictions without insight into their reasoning. This project attempts to address that limitation by:

- Building multiple hate speech detection models with different complexity levels  
- Comparing traditional and deep learning approaches  
- Providing word-level interpretability using attention mechanisms  
- Visualizing prediction probabilities and explanations through a web interface  

The intention is to better understand both model performance and model behavior, especially in sensitive NLP applications such as hate speech detection.

---

## Models Implemented

### TF-IDF + Logistic Regression (Baseline)

A classical machine learning baseline using TF-IDF feature extraction and logistic regression. This provides a reference point to evaluate improvements from neural architectures.

### BiLSTM Sequence Model

A bidirectional LSTM trained from scratch on preprocessed text data. This model captures sequential dependencies in language and typically improves contextual understanding compared to traditional ML approaches.

### DistilBERT Transformer Model

A fine-tuned transformer model trained on the HateXplain dataset. DistilBERT was chosen for its balance between performance and computational efficiency. Attention weights are used to produce interpretable word-level importance scores.

---

## Dataset

The primary dataset used is the **HateXplain dataset**, which contains:

- Labeled social media text  
- Three classes: Hate Speech, Offensive, Normal  
- Human-annotated rationales identifying words responsible for labeling  

This dataset supports both classification and explainability experiments.

---

## Explainability Approach

Explainability is a central part of this project. The system currently includes:

- Attention-based word highlighting for transformer models  
- Probability score visualization for model confidence  
- Comparative outputs across multiple models  
- Experiments with ensemble decision strategies  

The goal is to move toward more interpretable moderation systems rather than purely predictive ones.

---

## System Architecture

The project is structured as a modular full-stack system:

- **Backend:** FastAPI-based inference service serving trained NLP models  
- **Model Layer:** TF-IDF baseline, BiLSTM neural model, and DistilBERT transformer  
- **Explainability Layer:** Attention extraction and probability analysis  
- **Frontend:** React-based interface for prediction visualization and comparison  

This structure allows experimentation with model evaluation, explainability, and deployment simultaneously.
