from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import os
import numpy as np

app = Flask(__name__, template_folder='templates', static_folder='static')

# Load files
model = joblib.load(r'C:\Users\hp\OneDrive\Desktop\ml_model_training\final_model.pkl')
scaler = joblib.load(r'C:\Users\hp\OneDrive\Desktop\ml_model_training\scaler.pkl')
features = joblib.load(r'C:\Users\hp\OneDrive\Desktop\ml_model_training\selected_features.pkl')

@app.route('/')
def home():
    """Render the main interactive frontend"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint for predictions"""
    try:
        data = request.json
        
        # Protocol mapping (for string to numeric conversion if needed)
        protocol_map = {
            'TCP': 0,
            'UDP': 1,
            'ICMP': 2,
            'Other': 3
        }
        
        # Convert protocol string to number if it's a string
        if 'protocol' in data and isinstance(data['protocol'], str):
            data['protocol'] = protocol_map.get(data['protocol'], 3)
        
        # Ensure all values are numeric
        for key in data:
            if isinstance(data[key], str):
                try:
                    data[key] = float(data[key])
                except ValueError:
                    data[key] = 0
        
        # Convert input → DataFrame
        df = pd.DataFrame([data])
        
        # Feature order fix - ensure all required features are present
        # Fill missing features with 0 if they don't exist in input
        for feature in features:
            if feature not in df.columns:
                df[feature] = 0
        
        # Select only required features in correct order
        df = df[features]
        
        # Scaling
        scaled = scaler.transform(df)
        
        # Prediction
        pred = model.predict(scaled)[0]
        
        # Get prediction probabilities if available
        try:
            proba = model.predict_proba(scaled)
            confidence = max(proba[0])
        except:
            confidence = None
        
        response = {
            "attack_type": str(pred),
            "confidence": float(confidence) if confidence else None
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 400

@app.route('/api/features', methods=['GET'])
def get_features():
    """Return list of required features for documentation"""
    return jsonify({"features": features})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)