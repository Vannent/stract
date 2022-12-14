import os
import re
from typing import List
import openai
import argparse
from dotenv import load_dotenv, find_dotenv

MAX_INPUT_LENGTH = 32
load_dotenv(find_dotenv())

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    if validate_length(user_input):
        generate_brand_content(user_input)
        generate_brand_hashtags(user_input)
    else:
        raise ValueError(
            f"Input length is too long. Must be under{MAX_INPUT_LENGTH}"
            )


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH 


def generate_brand_content(prompt: str) -> str:
    # Load Environmental Variables.
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Load API Content
    prompt_sentence = f"Generate upbeat branding content for {prompt}: "

    response = openai.Completion.create(engine="text-davinci-002", prompt=prompt_sentence, max_tokens=32)

    # Extract output text.
    brand_text: str = response["choices"][0]["text"]
    brand_text = brand_text.strip() # Strip white space.

    last_char = brand_text[-1]
    if last_char not in {".", "!", "?"}: # Add ... to truncated statements.
        brand_text += "..." 
    return brand_text


def generate_brand_hashtags(prompt: str) -> List[str]:
    # Load Environmental Variables.
    openai.api_key = os.getenv("OPENAI_API_KEY")

    # Load API Content
    prompt_sentence = f"Generate related branding hashtags for {prompt}: "

    response = openai.Completion.create(engine="text-davinci-002", prompt=prompt_sentence, max_tokens=32)

    # Extract output text.
    hashtags: str = response["choices"][0]["text"]
    hashtags = hashtags.strip("\n") # Strip white space.
    hashtags_arr = re.split(" ", hashtags)

    return hashtags_arr

if __name__ == "__main__":
    main()