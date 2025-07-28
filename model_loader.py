import os
import gdown
from tensorflow.keras.models import load_model

def load_model_from_drive():
    model_path = "brain_tumor.h5"
    if not os.path.exists(model_path):
        print("🔽 Downloading model from Google Drive...")
        drive_url = os.environ.get("MODEL_DRIVE_LINK")
        if not drive_url:
            raise RuntimeError("MODEL_DRIVE_LINK env variable is not set.")
        gdown.download(drive_url, model_path, quiet=False)
    print("✅ Model loaded successfully")
    return load_model(model_path)
