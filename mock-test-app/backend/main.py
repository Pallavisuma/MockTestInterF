from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF

app = FastAPI()

# Allow requests from the frontend (e.g., React app on port 3000)


origins = [

    "*",  # Allows requests from any origin (change if needed)

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow frontend to access backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Save the file to a temporary location
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())

    # Extract text from the PDF
    extracted_text = ""
    with fitz.open(file_location) as pdf_document:
        for page_num in range(pdf_document.page_count):
            page = pdf_document.load_page(page_num)
            extracted_text += page.get_text()

    return {"extracted_text": extracted_text}
