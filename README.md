# Attack Prediction System - Interactive Frontend

An interactive web-based frontend for network attack prediction using machine learning.

## 📁 Project Structure

```
deployment/
├── app.py                      # Flask application
├── traing.ipynb               # Training notebook
├── templates/
│   └── index.html             # Main web interface
├── static/
│   ├── style.css              # Styling
│   └── script.js              # Client-side logic
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.7+
- Flask
- pandas
- scikit-learn
- joblib

### Installation

1. Install required dependencies:
```bash
pip install flask pandas scikit-learn joblib
```

2. Ensure your model files are in the correct path:
```
C:\Users\hp\OneDrive\Desktop\ml_model_training\
├── final_model.pkl
├── scaler.pkl
└── selected_features.pkl
```

### Running the Application

1. Navigate to the deployment folder:

2. Start the Flask server:
```bash
python app.py
```

3. Open your browser and go to:
```
http://localhost:5000
```

## 📊 Features

### Interactive Form
- **Protocol Type**: Network protocol (tcp, udp, icmp, etc.)
- **Service**: Network service (http, ftp, ssh, etc.)
- **Duration**: Connection duration in seconds
- **Bytes Transfer**: Source and destination bytes
- **Flags & Status**: Connection flags and status indicators
- **Security Indicators**: Login attempts, compromised accounts, root access, etc.

### Real-time Predictions
- Submit network features through the web interface
- Get instant attack type predictions
- View confidence scores
- Mobile-friendly responsive design

## 🎨 UI/UX Features

- 🎯 Clean, modern interface with gradient design
- 📱 Fully responsive on desktop, tablet, and mobile
- ⚡ Real-time form validation
- 🔄 Loading indicators during prediction
- 📊 Clear result display with confidence metrics
- 🎪 Easy form reset and new predictions

## 🔌 API Endpoints

### GET `/`
- Returns the interactive frontend

### POST `/predict`
Request body:
```json
{
  "protocol_type": "tcp",
  "service": "http",
  "duration": 100,
  "src_bytes": 500,
  "dst_bytes": 1000,
  ...
}
```

Response:
```json
{
  "attack_type": "normal",
  "confidence": 0.95
}
```

### GET `/api/features`
- Returns list of required features

## 🛠️ Customization

### Adding More Input Fields
Edit `templates/index.html` and add form groups:
```html
<div class="form-group">
    <label for="field_name">Field Label</label>
    <input type="number" id="field_name" name="field_name" required>
</div>
```

### Styling
Modify `static/style.css` to change colors, fonts, and layout.

### Frontend Logic
Update `static/script.js` to modify form submission and result handling.

## 🔒 Security Notes

- Enable CORS if accessing from different domain
- Validate all inputs on the backend (already implemented)
- Use HTTPS in production
- Add authentication/authorization as needed

## 📝 Notes

- The form fields match your model's expected features
- Adjust input fields based on your actual feature names
- Test with sample data before deployment
- Monitor model predictions for accuracy

## 🤝 Support

For issues or improvements, check your training notebook (`traing.ipynb`) for model details and feature information.

---

**Version**: 1.0  
**Last Updated**: 2026-04-15
