import cv2
import torch
import numpy as np
from PIL import Image
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import sys
import os

def segment_lines(image_path):
    """
    Uses OpenCV contour detection with morphological operations to find and crop lines of text.
    Returns a list of cropped PIL Images ordered from top to bottom.
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at {image_path}")

    # Read image using OpenCV
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    # Adaptive thresholding to handle different lighting conditions
    thresh = cv2.adaptiveThreshold(
        blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
    )
    
    # Dilation to connect text characters horizontally into lines
    # The kernel size (50, 5) assumes horizontal text lines
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (50, 5))
    dilated = cv2.dilate(thresh, kernel, iterations=2)
    
    # Find contours (the text blocks/lines)
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Get bounding boxes and sort them from top to bottom (by Y coordinate)
    bounding_boxes = [cv2.boundingRect(c) for c in contours]
    bounding_boxes.sort(key=lambda b: b[1])
    
    cropped_lines = []
    for x, y, w, h in bounding_boxes:
        # Filter out very small boxes (likely noise)
        if w > 20 and h > 10:
            # Crop the original image with a slight padding
            pad = 5
            y1 = max(0, y - pad)
            y2 = min(image.shape[0], y + h + pad)
            x1 = max(0, x - pad)
            x2 = min(image.shape[1], x + w + pad)
            
            roi = image[y1:y2, x1:x2]
            
            # Convert OpenCV BGR format to PIL Image (RGB format) expected by TrOCR
            roi_rgb = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(roi_rgb)
            cropped_lines.append(pil_img)
            
    return cropped_lines

def run_trocr_pipeline(image_path):
    """
    Loads TrOCR model, segments the image, and predicts text for each line.
    """
    print("Loading TrOCR model ('microsoft/trocr-base-handwritten')...")
    # Load processor and model
    processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
    model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
    
    # Use GPU if available
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")
    model.to(device)
    
    print(f"\nSegmenting lines from image: {image_path}")
    line_images = segment_lines(image_path)
    print(f"Found {len(line_images)} lines of text.")
    
    predicted_text_block = []
    
    print("\nStarting handwriting recognition...")
    for i, line_img in enumerate(line_images):
        # Preprocess the cropped line image
        pixel_values = processor(line_img, return_tensors="pt").pixel_values.to(device)
        
        # Generate text prediction
        generated_ids = model.generate(pixel_values)
        generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        
        predicted_text_block.append(generated_text)
        print(f"Line {i+1}: {generated_text}")
        
    print("\n==============================")
    print("--- Final Extracted Text ---")
    print("==============================")
    final_text = "\n".join(predicted_text_block)
    print(final_text)
    
    return final_text

if __name__ == "__main__":
    # Ensure all required libraries are available
    try:
        import transformers
    except ImportError:
        print("Missing requirements. Please install them by running:")
        print("pip install opencv-python torch torchvision transformers pillow")
        sys.exit(1)

    if len(sys.argv) > 1:
        img_path = sys.argv[1]
    else:
        print("Usage: python local_trocr_pipeline.py <path_to_image>")
        print("Example: python local_trocr_pipeline.py prescription.jpg")
        sys.exit(1)
        
    run_trocr_pipeline(img_path)
