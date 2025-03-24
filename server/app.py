from flask import Flask, request, jsonify
from flask_cors import CORS  
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)

# Load the new model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("vikram71198/distilroberta-base-finetuned-fake-news-detection")
model = AutoModelForSequenceClassification.from_pretrained("vikram71198/distilroberta-base-finetuned-fake-news-detection")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")
    print(text)

    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)

    # Run the model on the input text
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the predicted label (output probabilities)
    logits = outputs.logits
    predicted_class_id = torch.argmax(logits, dim=-1).item()
    confidence_score = torch.softmax(logits, dim=-1).max().item()

    # Return the prediction
    return jsonify({"label": predicted_class_id, "score": confidence_score})

if __name__ == "__main__":
    app.run(debug=True)
