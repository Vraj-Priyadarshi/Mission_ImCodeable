import json
import re
from typing import List
from openai import OpenAI
from app.config import settings
from app.models.schemas import MLDataInput, CareerInsight
from app.services.prompt_builder import build_career_insights_prompt


class LLMService:
    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY,
            base_url=settings.OPENAI_BASE_URL
        )
        self.model = settings.OPENAI_MODEL
    
    def _parse_json_response(self, response_text: str) -> List[dict]:
        """
        Parse JSON from LLM response, handling potential formatting issues.
        """
        # Try to extract JSON array from the response
        response_text = response_text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```"):
            # Remove opening code block
            response_text = re.sub(r'^```(?:json)?\n?', '', response_text)
            # Remove closing code block
            response_text = re.sub(r'\n?```$', '', response_text)
        
        # Try to find JSON array in the response
        json_match = re.search(r'\[[\s\S]*\]', response_text)
        if json_match:
            response_text = json_match.group()
        
        try:
            parsed = json.loads(response_text)
            if isinstance(parsed, list):
                return parsed
            elif isinstance(parsed, dict) and 'insights' in parsed:
                return parsed['insights']
            else:
                return [parsed]
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse LLM response as JSON: {str(e)}")
    
    async def generate_career_insights(self, ml_data: MLDataInput) -> List[CareerInsight]:
        """
        Generate career insights using the LLM based on ML data.
        """
        prompt = build_career_insights_prompt(ml_data)
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert AI Career Intelligence Analyst. Always respond with valid JSON arrays only, no additional text or markdown."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            response_text = response.choices[0].message.content
            
            # Parse the JSON response
            insights_data = self._parse_json_response(response_text)
            
            # Handle case where response is wrapped in an object
            if isinstance(insights_data, dict):
                if 'insights' in insights_data:
                    insights_data = insights_data['insights']
                else:
                    insights_data = [insights_data]
            
            # Validate and convert to CareerInsight objects
            insights = []
            for item in insights_data:
                try:
                    insight = CareerInsight(**item)
                    insights.append(insight)
                except Exception as e:
                    # Log validation error but continue with valid insights
                    print(f"Skipping invalid insight: {e}")
                    continue
            
            return insights
            
        except Exception as e:
            raise Exception(f"LLM API call failed: {str(e)}")


# Singleton instance
llm_service = LLMService()
