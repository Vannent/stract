from typing import Union
from stract import generate_brand_content, generate_brand_hashtags
from fastapi import FastAPI

app = FastAPI()


@app.get("/generate_content")
def generate_content_api(prompt: str):
    content = generate_brand_content(prompt)
    return {"snippet": content}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# Command: /bin/python3 -m uvicorn stract_api:app --reload
