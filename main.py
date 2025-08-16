from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io
import os

app = FastAPI()

# ------------------ CORS ------------------
origins = [
    "http://localhost:3000",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3002",
    "",  # frontend hosted on Render
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Load Model ------------------
MODEL_PATH = os.path.join("models", "resnet50v2_best.h5")  # your trained model
model = None
IMG_SIZE = 244  # ✅ must match training input size

if os.path.exists(MODEL_PATH):
    try:
        model = load_model(MODEL_PATH, compile=False)
        print(f"✅ Model loaded from {MODEL_PATH}")
    except Exception as e:
        print(f"❌ Failed to load model: {e}")
else:
    print(f"❌ Model not found at {MODEL_PATH}. Please place your trained model file inside 'models/' folder.")

# ------------------ Class Labels ------------------
class_names = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]

# ------------------ Prediction Endpoint ------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Cannot perform prediction.")

    try:
        # Read image
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        img = img.resize((IMG_SIZE, IMG_SIZE))  # ✅ fixed: match training size (244x244)

        # Preprocess
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        predictions = model.predict(img_array)
        class_index = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))

        return {
            "prediction": class_names[class_index],
            "confidence": f"{confidence * 100:.2f}%"
        }

    except Exception as e:
        print(f"❌ Prediction error: {e}")
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")
