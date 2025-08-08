from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pdfminer.high_level import extract_text
import os
import re

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/parse-jd/")
async def parse_jd(file: UploadFile = File(...)):
    contents = await file.read()
    with open("temp.pdf", "wb") as f:
        f.write(contents)

    text = extract_text("temp.pdf")
    os.remove("temp.pdf")

    # Very simple job role detection
    match = re.search(r"(?:Job\s*Title|Role)[:\-]?\s*(.*)", text, re.IGNORECASE)
    job_role = match.group(1).strip() if match else "Unknown Role"

    return {"job_role": job_role}
@app.post("/parse-resume/")
async def parse_resume(file: UploadFile = File(...)):
    contents = await file.read()
    with open("resume.pdf", "wb") as f:
        f.write(contents)

    text = extract_text("resume.pdf")
    os.remove("resume.pdf")

    name = re.search(r"Name[:\-]?\s*(.*)", text)
    email = re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", text)
    phone = re.search(r"\b\d{10}\b", text)

    return {
        "name": name.group(1).strip() if name else "Unknown",
        "email": email.group(0) if email else "Unknown",
        "phone": phone.group(0) if phone else "Unknown"
    }
