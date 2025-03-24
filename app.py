from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import torch

app = Flask(__name__)

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("mrm8488/bert-tiny-finetuned-fake-news-detection")
model = AutoModelForSequenceClassification.from_pretrained("mrm8488/bert-tiny-finetuned-fake-news-detection")
classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    # Get predictions
    predictions = classifier(text)
    return jsonify(predictions)

if __name__ == "__main__":
    app.run(debug=True)
