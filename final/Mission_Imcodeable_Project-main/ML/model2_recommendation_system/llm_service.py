"""
LLM service for ranking recommendations and generating explanations.
Uses OpenAI/Claude API via LiteLLM for flexibility.
"""

import json
import logging
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime

logger = logging.getLogger(__name__)

# Try to import litellm, fall back gracefully if not available
try:
    import litellm
    HAS_LITELLM = True
except ImportError:
    HAS_LITELLM = False
    logger.warning("litellm not installed, using mock LLM responses")


class LLMService:
    """
    Service for LLM-based ranking and explanation generation.
    
    Rules:
    - LLM is ONLY for ranking items from the shortlist
    - LLM CANNOT invent new courses or projects
    - LLM MUST return valid JSON only
    - Fallback to rule-based ranking if LLM fails
    """
    
    def __init__(
        self,
        model: str = "openai/gpt-oss-20b",
        temperature: float = 0.7,
        max_tokens: int = 2000,
    ):
        """Initialize LLM service."""
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        logger.info(f"LLMService initialized with model: {model}")
    
    def rank_and_explain(
        self,
        target_role: str,
        target_sector: str,
        shortlisted_courses: List[Dict[str, Any]],
        shortlisted_projects: List[Dict[str, Any]],
        user_profile: Dict[str, Any],
        num_recommended_courses: int = 3,
        num_recommended_projects: int = 2,
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], str]:
        """
        Use LLM to rank shortlisted items and provide explanations.
        
        Returns:
            (ranked_courses, ranked_projects, reasoning)
        """
        
        logger.info(f"LLM ranking for role: {target_role}")
        
        # Build the prompt
        prompt = self._build_prompt(
            target_role=target_role,
            target_sector=target_sector,
            shortlisted_courses=shortlisted_courses,
            shortlisted_projects=shortlisted_projects,
            user_profile=user_profile,
            num_recommended_courses=num_recommended_courses,
            num_recommended_projects=num_recommended_projects,
        )
        
        # Call LLM
        try:
            if HAS_LITELLM:
                response_text = self._call_llm(prompt)
            else:
                logger.warning("Using mock LLM response (no litellm available)")
                response_text = self._mock_llm_response(
                    shortlisted_courses,
                    shortlisted_projects,
                    num_recommended_courses,
                    num_recommended_projects,
                )
            
            # Parse response
            result = self._parse_llm_response(response_text)
            
            if result:
                return (
                    result.get('ranked_courses', []),
                    result.get('ranked_projects', []),
                    result.get('reasoning', ''),
                )
            else:
                logger.warning("Failed to parse LLM response, using fallback ranking")
                return self._fallback_ranking(
                    shortlisted_courses,
                    shortlisted_projects,
                    num_recommended_courses,
                    num_recommended_projects,
                )
        
        except Exception as e:
            logger.error(f"LLM call failed: {e}, using fallback ranking")
            return self._fallback_ranking(
                shortlisted_courses,
                shortlisted_projects,
                num_recommended_courses,
                num_recommended_projects,
            )
    
    def _build_prompt(
        self,
        target_role: str,
        target_sector: str,
        shortlisted_courses: List[Dict[str, Any]],
        shortlisted_projects: List[Dict[str, Any]],
        user_profile: Dict[str, Any],
        num_recommended_courses: int,
        num_recommended_projects: int,
    ) -> str:
        """Build the LLM prompt."""
        
        courses_json = json.dumps(shortlisted_courses, indent=2)
        projects_json = json.dumps(shortlisted_projects, indent=2)
        user_json = json.dumps(user_profile, indent=2)
        
        prompt = f"""You are an expert educational advisor specializing in role-based learning paths.

TARGET ROLE: {target_role}
TARGET SECTOR: {target_sector}

USER PROFILE:
{user_json}

SHORTLISTED COURSES (role-filtered and domain-restricted):
{courses_json}

SHORTLISTED PROJECTS (role-filtered and domain-restricted):
{projects_json}

TASK:
1. Rank the courses by relevance to the target role (highest priority)
2. Rank the projects by relevance to the target role (highest priority)
3. Select the top {num_recommended_courses} COURSES and top {num_recommended_projects} PROJECTS
4. Provide ONE concise explanation per recommendation

CRITICAL CONSTRAINTS:
- ONLY recommend from the provided lists (NO HALLUCINATIONS)
- Prioritize TARGET ROLE relevance above all else
- Each explanation must be 1-2 sentences
- Return VALID JSON ONLY (no markdown, no extra text)

RETURN FORMAT (STRICT JSON):
{{
  "ranked_courses": [
    {{
      "course_id": "...",
      "title": "...",
      "domain": "...",
      "difficulty": "...",
      "duration_weeks": ...,
      "skills_covered": [...],
      "explanation": "Why this course aligns with {target_role}"
    }}
  ],
  "ranked_projects": [
    {{
      "project_id": "...",
      "title": "...",
      "domain": "...",
      "difficulty": "...",
      "complexity": "...",
      "duration_weeks": ...,
      "skills_required": [...],
      "explanation": "Why this project aligns with {target_role}"
    }}
  ],
  "reasoning": "Overall recommendation strategy (1-2 sentences)"
}}
"""
        
        return prompt
    
    def _call_llm(self, prompt: str) -> str:
        """Call LLM via litellm."""
        
        try:
            response = litellm.completion(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                timeout=30,
            )
            
            return response.choices[0].message.content
        
        except Exception as e:
            logger.error(f"LiteLLM call failed: {e}")
            raise
    
    def _parse_llm_response(self, response_text: str) -> Optional[Dict[str, Any]]:
        """Parse JSON response from LLM."""
        
        try:
            # Try direct JSON parsing
            result = json.loads(response_text)
            
            # Validate structure
            if 'ranked_courses' not in result or 'ranked_projects' not in result:
                logger.warning("Response missing required fields")
                return None
            
            return result
        
        except json.JSONDecodeError:
            # Try to extract JSON from markdown code blocks
            try:
                if '```json' in response_text:
                    start = response_text.find('```json') + 7
                    end = response_text.find('```', start)
                    json_str = response_text[start:end].strip()
                    result = json.loads(json_str)
                    return result
                elif '```' in response_text:
                    start = response_text.find('```') + 3
                    end = response_text.find('```', start)
                    json_str = response_text[start:end].strip()
                    result = json.loads(json_str)
                    return result
            except:
                pass
            
            logger.warning("Failed to parse LLM response as JSON")
            return None
    
    def _fallback_ranking(
        self,
        shortlisted_courses: List[Dict[str, Any]],
        shortlisted_projects: List[Dict[str, Any]],
        num_recommended_courses: int,
        num_recommended_projects: int,
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], str]:
        """Fallback to rule-based ranking when LLM fails."""
        
        logger.info("Using fallback rule-based ranking")
        
        # Sort by score (already computed in recommendation_engine)
        ranked_courses = sorted(
            shortlisted_courses,
            key=lambda x: x.get('_score', 0),
            reverse=True
        )[:num_recommended_courses]
        
        ranked_projects = sorted(
            shortlisted_projects,
            key=lambda x: x.get('_score', 0),
            reverse=True
        )[:num_recommended_projects]
        
        # Add generic explanations
        for course in ranked_courses:
            course['explanation'] = "Highly relevant to your target role based on role mapping and skill requirements."
        
        for project in ranked_projects:
            project['explanation'] = "Valuable hands-on experience aligned with your target role."
        
        # Remove internal scoring field
        for item in ranked_courses + ranked_projects:
            item.pop('_score', None)
        
        reasoning = "Recommendations prioritize target role alignment and skill development."
        
        return ranked_courses, ranked_projects, reasoning
    
    def _mock_llm_response(
        self,
        shortlisted_courses: List[Dict[str, Any]],
        shortlisted_projects: List[Dict[str, Any]],
        num_recommended_courses: int,
        num_recommended_projects: int,
    ) -> str:
        """Generate mock LLM response for testing."""
        
        selected_courses = sorted(
            shortlisted_courses,
            key=lambda x: x.get('_score', 0),
            reverse=True
        )[:num_recommended_courses]
        
        selected_projects = sorted(
            shortlisted_projects,
            key=lambda x: x.get('_score', 0),
            reverse=True
        )[:num_recommended_projects]
        
        # Add explanations
        for course in selected_courses:
            course['explanation'] = f"Essential foundation for mastering {course.get('title', 'this skill')}."
        
        for project in selected_projects:
            project['explanation'] = f"Practical hands-on experience applying {project.get('title', 'key concepts')}."
        
        response = {
            "ranked_courses": selected_courses,
            "ranked_projects": selected_projects,
            "reasoning": "Recommendations are based on role alignment and progressive skill building."
        }
        
        return json.dumps(response, indent=2)
