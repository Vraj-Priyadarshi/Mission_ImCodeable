"""
Pydantic models for request and response validation.
"""

from typing import List, Optional
from pydantic import BaseModel, Field, validator


class RecommendationRequest(BaseModel):
    """Incoming request from frontend with user profile and preferences."""
    
    user_id: str = Field(..., description="Unique user identifier")
    education_level: str = Field(..., description="User's education level")
    field_of_study: Optional[str] = Field(None, description="User's field of study")
    percentage: Optional[float] = Field(None, description="Grade percentage or GPA")
    
    # Healthcare skills
    has_ehr: bool = False
    has_hl7_fhir: bool = False
    has_medical_imaging: bool = False
    has_healthcare_security: bool = False
    has_telemedicine: bool = False
    
    # Agriculture skills
    has_iot_sensors: bool = False
    has_drone_ops: bool = False
    has_precision_ag: bool = False
    has_crop_modeling: bool = False
    has_soil_analysis: bool = False
    
    # Urban/Smart City skills
    has_gis: bool = False
    has_smart_grid: bool = False
    has_traffic_mgmt: bool = False
    has_urban_iot: bool = False
    has_building_auto: bool = False
    
    # Course experience
    num_courses: int = Field(0, ge=0, description="Number of completed courses")
    avg_course_grade: Optional[float] = Field(None, description="Average course grade")
    courses_names: List[str] = Field(default_factory=list, description="Names of completed courses")
    
    # Project experience
    num_projects: int = Field(0, ge=0, description="Number of completed projects")
    avg_project_complexity: Optional[str] = Field(None, description="Average project complexity")
    
    # Certifications
    num_certifications: int = Field(0, ge=0, description="Number of certifications")
    certification_names: List[str] = Field(default_factory=list, description="Certification names")
    
    # Soft skills
    has_communication: bool = False
    has_teamwork: bool = False
    has_problem_solving: bool = False
    has_leadership: bool = False
    
    # Target role and sector
    target_sector: str = Field(..., description="Target industry sector")
    target_role: str = Field(..., description="Target job role")
    
    @validator('education_level')
    def validate_education_level(cls, v):
        valid_levels = ['high_school', 'diploma', 'bachelors', 'masters', 'phd']
        if v.lower() not in valid_levels:
            raise ValueError(f'Invalid education level. Must be one of {valid_levels}')
        return v.lower()
    
    @validator('target_sector')
    def validate_sector(cls, v):
        valid_sectors = ['healthcare_technology', 'agricultural_sciences', 'urban_smart_city']
        if v.lower() not in valid_sectors:
            raise ValueError(f'Invalid sector. Must be one of {valid_sectors}')
        return v.lower()


class CourseRecommendation(BaseModel):
    """Recommended course with explanation."""
    
    course_id: str
    title: str
    domain: str
    difficulty: str
    duration_weeks: int
    skills_covered: List[str]
    explanation: str


class ProjectRecommendation(BaseModel):
    """Recommended project with explanation."""
    
    project_id: str
    title: str
    domain: str
    difficulty: str
    complexity: str
    duration_weeks: int
    skills_required: List[str]
    explanation: str


class RecommendationResponse(BaseModel):
    """Final recommendation response with courses and projects."""
    
    user_id: str
    target_role: str
    target_sector: str
    recommended_courses: List[CourseRecommendation]
    recommended_projects: List[ProjectRecommendation]
    reasoning: str
    generated_at: str


class ErrorResponse(BaseModel):
    """Error response model."""
    
    error: str
    details: Optional[str] = None
    user_id: Optional[str] = None
