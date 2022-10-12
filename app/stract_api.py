from typing import Union
from stract import generate_brand_content, generate_brand_hashtags
from fastapi import FastAPI, HTTPException

app = FastAPI()
MAX_INPUT_LENGTH = 32

@app.get("/generate_content")
def generate_content_api(prompt: str):
    validate_input_length(prompt)
    content = generate_brand_content(prompt)
    return {"content": content, "keywords": []}


@app.get("/generate_keywords")
def generate_hashtags_api(prompt: str):
    validate_input_length(prompt)
    hashtags = generate_brand_hashtags(prompt)
    return {"content": None, "hashtags": hashtags}

@app.get("/generate_snippet_and_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    content = generate_brand_content(prompt)
    hashtags = generate_brand_hashtags(prompt)
    return {"content": content, "hashtags": hashtags}

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )

# Command: /bin/python3 -m uvicorn stract_api:app --reload