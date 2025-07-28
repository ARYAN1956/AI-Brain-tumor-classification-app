from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from model_loader import load_model_from_drive
from PIL import Image
import numpy as np
import io
import tensorflow as tf

app = FastAPI()
model = load_model_from_drive()

@app.get("/")
def root():
    return {"message": "🚀 FastAPI TensorFlow Model is Running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).resize((224, 224))
        image = np.array(image) / 255.0
        if image.ndim == 2:  # Grayscale to RGB
            image = np.stack((image,)*3, axis=-1)
        image = np.expand_dims(image, axis=0)

        prediction = model.predict(image)
        result = prediction.argmax(axis=1)[0]
        return {"prediction": int(result)}
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
