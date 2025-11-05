from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

chatbot_model = pipeline("text-generation", model="gpt4")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_msg = data.get("message", "").strip()
    if not user_msg:
        return jsonify({"error": "Empty message"}), 400
  
    result = chatbot_model(user_msg, max_length=100)[0]["generated_text"]
    return jsonify({"response": result})
