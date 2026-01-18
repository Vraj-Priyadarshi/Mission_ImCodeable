import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Supports OpenAI, OpenRouter, or any OpenAI-compatible API
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    OPENAI_BASE_URL: str = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")

settings = Settings()
