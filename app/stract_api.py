from stract import generate_brand_content, generate_brand_hashtags
from fastapi import FastAPI, HTTPException
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
MAX_INPUT_LENGTH = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/generate_all")
def generate_all_api(prompt: str):
    validate_input_length(prompt)
    content = generate_brand_content(prompt)
    hashtags = generate_brand_hashtags(prompt)
    return {"content": content, "hashtags": hashtags}

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Mut be under {MAX_INPUT_LENGTH} characters.",
        )

handler = Mangum(app, lifespan="off")