# 📚 Career Saarthi - API Documentation

> **Version:** 1.0.0  
> **Last Updated:** January 18, 2026  
> **Architecture:** Microservices (React + Spring Boot + FastAPI ML Services)

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React)                                │
│                           http://localhost:5173                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND (Spring Boot)                                │
│                           http://localhost:8080                              │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Auth API   │  │  User API    │  │ Dashboard API│  │ Career API   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│   ML Model 1        │  │   ML Model 2        │  │   ML Model 3        │
│   Skill Intelligence│  │   Recommendation    │  │   Career Insights   │
│   :8001             │  │   System :8002      │  │   API :8003         │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

---

## 🔐 Authentication & Security

### JWT Token Authentication

All protected endpoints require a valid JWT token in the `Authorization` header.

```http
Authorization: Bearer <jwt_token>
```

#### Token Details
| Property | Value |
|----------|-------|
| Algorithm | HS256 |
| Expiration | 30 days (2592000000 ms) |
| Storage | `localStorage.skillpath_token` |

#### Token Payload Structure
```json
{
  "sub": "user@example.com",
  "userId": "uuid",
  "role": "USER",
  "iat": 1737180000,
  "exp": 1739772000
}
```

---

### OAuth2 (Google) Authentication

#### Flow
1. **Initiate OAuth2**: `GET /oauth2/authorization/google`
2. **Google Login**: User authenticates with Google
3. **Callback**: `GET /oauth2/callback/google`
4. **Success Redirect**: `http://localhost:5173/oauth2/redirect?token=<jwt>&user=<encoded_user>`
5. **Failure Redirect**: `http://localhost:5173/login?error=<message>`

#### OAuth2 Endpoints
| Endpoint | Description |
|----------|-------------|
| `GET /oauth2/authorization/google` | Initiates Google OAuth2 flow |
| `GET /oauth2/callback/google` | OAuth2 callback handler |
| `GET /api/oauth2/status` | Check OAuth2 integration status |

---

## 🌐 CORS Configuration

### Backend (Spring Boot) - Port 8080

```java
Allowed Origins: ["http://localhost:3000", "http://localhost:5173"]
Allowed Methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
Allowed Headers: ["*"]
Exposed Headers: ["Authorization"]
Allow Credentials: true
Max Age: 3600 seconds (1 hour)
```

### ML Services (FastAPI) - Ports 8001, 8002, 8003

```python
allow_origins=["*"]
allow_credentials=True
allow_methods=["*"]
allow_headers=["*"]
```

---

## 📡 Service Endpoints

### Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | `http://localhost:5173` | React/Vite Application |
| Backend | `http://localhost:8080` | Spring Boot API |
| ML Model 1 | `http://localhost:8001` | Skill Intelligence API |
| ML Model 2 | `http://localhost:8002` | Recommendation System |
| ML Model 3 | `http://localhost:8003` | Career Insights API |

---

# 🖥️ Backend API (Spring Boot)

**Base URL:** `http://localhost:8080`

## Authentication API (`/api/auth`)

### `POST /api/auth/signup`
Register a new user account.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "success": true
}
```

---

### `POST /api/auth/login`
Authenticate user and receive JWT token.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "USER",
    "emailVerified": true,
    "authProvider": "MANUAL"
  }
}
```

---

### `GET /api/auth/verify`
Verify email address with token.

**Auth Required:** No

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | Email verification token |

**Example:** `GET /api/auth/verify?token=36d8864c-fb95-...`

**Response:** `200 OK`
```json
{
  "message": "Email verified successfully",
  "success": true
}
```

---

### `POST /api/auth/forgot-password`
Request password reset email.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password reset email sent",
  "success": true
}
```

---

### `POST /api/auth/reset-password`
Reset password with token.

**Auth Required:** No

**Request Body:**
```json
{
  "token": "e2241663-e987-...",
  "newPassword": "NewSecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password reset successfully",
  "success": true
}
```

---

### `GET /api/auth/validate-reset-token`
Validate password reset token.

**Auth Required:** No

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | Password reset token |

**Response:** `200 OK`
```json
{
  "message": "Token is valid",
  "success": true
}
```

---

### `GET /api/auth/health`
Health check for auth service.

**Auth Required:** No

**Response:** `200 OK`
```json
{
  "message": "Auth service is running",
  "success": true
}
```

---

## User API (`/api/users`)

### `GET /api/users/me`
Get current authenticated user's profile.

**Auth Required:** Yes (JWT)

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1995-06-15",
  "gender": "MALE",
  "role": "USER",
  "emailVerified": true,
  "authProvider": "MANUAL",
  "hasPassword": true,
  "createdAt": "2026-01-15T10:30:00Z"
}
```

---

### `PUT /api/users/update-profile`
Update user profile information.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "fullName": "John Smith",
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1995-06-15",
  "gender": "MALE"
}
```

**Response:** `200 OK` - Updated UserResponse

---

### `POST /api/users/change-password`
Change password for authenticated user.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password changed successfully",
  "success": true
}
```

---

### `POST /api/users/set-password`
Set password for Google OAuth users.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "newPassword": "NewSecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password set successfully",
  "success": true
}
```

---

## Onboarding API (`/api/onboarding`)

### `GET /api/onboarding/status`
Get user's onboarding completion status.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "onboardingCompleted": false,
  "steps": {
    "personalInfo": true,
    "academicInfo": false,
    "careerGoals": false,
    "skills": false
  }
}
```

---

### `POST /api/onboarding/submit`
Submit complete onboarding data.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "personalInfo": {
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1995-06-15",
    "gender": "MALE"
  },
  "academicProfile": {
    "educationLevel": "BACHELORS",
    "fieldOfStudy": "Computer Science",
    "institutionName": "MIT",
    "graduationYear": 2020,
    "percentage": 85.5
  },
  "careerProfile": {
    "sector": "Healthcare",
    "targetJobRole": "Health Data Analyst",
    "experienceLevel": "ENTRY_LEVEL",
    "yearsOfExperience": 1
  },
  "skillProfile": {
    "healthcareSkills": {
      "hasEhr": true,
      "hasHl7Fhir": false,
      "hasMedicalImaging": false,
      "hasHealthcareSecurity": true,
      "hasTelemedicine": false
    },
    "agricultureSkills": {
      "hasIotSensors": false,
      "hasDroneOps": false,
      "hasPrecisionAg": false,
      "hasCropModeling": false,
      "hasSoilAnalysis": false
    },
    "urbanSkills": {
      "hasGis": true,
      "hasSmartGrid": false,
      "hasTrafficMgmt": false,
      "hasUrbanIot": false,
      "hasBuildingAuto": false
    },
    "softSkills": {
      "hasCommunication": true,
      "hasTeamwork": true,
      "hasProblemSolving": true,
      "hasLeadership": false
    }
  }
}
```

**Response:** `201 Created`
```json
{
  "message": "Onboarding completed successfully",
  "success": true
}
```

---

## Dashboard API (`/api/dashboard`)

### `GET /api/dashboard/summary`
Get comprehensive dashboard summary with ML predictions.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "userSummary": {
    "fullName": "John Doe",
    "email": "user@example.com",
    "profileCompleteness": 85
  },
  "academicSummary": {
    "educationLevel": "BACHELORS",
    "fieldOfStudy": "Computer Science",
    "percentage": 85.5
  },
  "careerSummary": {
    "sector": "Healthcare",
    "targetJobRole": "Health Data Analyst"
  },
  "skillsSummary": {
    "totalSkills": 5,
    "healthcareSkills": 2,
    "agricultureSkills": 0,
    "urbanSkills": 1,
    "softSkills": 3
  },
  "courseSummary": {
    "totalCourses": 5,
    "averageGrade": 88.5
  },
  "projectSummary": {
    "totalProjects": 3,
    "averageComplexity": "INTERMEDIATE"
  },
  "certificationSummary": {
    "totalCertifications": 2
  },
  "externalApiData": {
    "skillPrediction": {
      "skillGapScore": 8.97,
      "timeToReadyMonths": 2.39,
      "recommendedSkills": [
        {"skill": "Budget Planning", "confidence": 16.4},
        {"skill": "Clinical Trials", "confidence": 14.03}
      ],
      "status": "Ready"
    },
    "recommendations": {
      "recommendedCourses": [...],
      "recommendedProjects": [...],
      "reasoning": "...",
      "generatedAt": "2026-01-18T10:30:00Z"
    },
    "status": {
      "skillPredictSuccess": true,
      "recommendationsSuccess": true,
      "youtubeEnrichmentSuccess": true
    }
  }
}
```

---

## Analytics API (`/api/analytics`)

### `GET /api/analytics/skill-gaps`
Get detailed skill gap analysis.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "skillGapScore": 8.97,
  "timeToReadyMonths": 2.39,
  "status": "Ready",
  "skillGaps": [
    {
      "skillName": "Budget Planning",
      "currentLevel": 20,
      "requiredLevel": 80,
      "gap": 60,
      "priority": "HIGH"
    }
  ],
  "recommendedSkills": [
    {"skill": "Budget Planning", "confidence": 16.4}
  ]
}
```

---

## Career API (`/api/career`)

### `GET /api/career/me`
Get current user's career profile.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "sector": "Healthcare",
  "targetJobRole": "Health Data Analyst",
  "experienceLevel": "ENTRY_LEVEL",
  "yearsOfExperience": 1,
  "currentJobTitle": null,
  "preferredWorkType": "HYBRID"
}
```

---

### `PUT /api/career/me`
Update career profile.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "sector": "Healthcare",
  "targetJobRole": "Health Data Analyst",
  "experienceLevel": "MID_LEVEL",
  "yearsOfExperience": 3
}
```

---

### `GET /api/career/pathway`
Get AI-generated career pathway.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "currentPosition": "Junior Analyst",
  "targetPosition": "Health Data Analyst",
  "estimatedTimeMonths": 6,
  "milestones": [
    {
      "title": "Complete Healthcare Data Fundamentals",
      "type": "COURSE",
      "duration": "4 weeks",
      "skills": ["EHR Systems", "Healthcare Terminology"]
    }
  ]
}
```

---

## Skills API (`/api/skills`)

### `GET /api/skills/me`
Get current user's skill profile.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "healthcareSkills": {
    "hasEhr": true,
    "hasHl7Fhir": false,
    "hasMedicalImaging": false,
    "hasHealthcareSecurity": true,
    "hasTelemedicine": false
  },
  "agricultureSkills": {...},
  "urbanSkills": {...},
  "softSkills": {...}
}
```

---

### `PUT /api/skills/me`
Update skill profile.

**Auth Required:** Yes (JWT)

---

## Academics API (`/api/academics`)

### `GET /api/academics/me`
Get academic profile.

**Auth Required:** Yes (JWT)

---

### `PUT /api/academics/me`
Update academic profile.

**Auth Required:** Yes (JWT)

---

## Courses API (`/api/courses`)

### `GET /api/courses/me`
Get all user's courses with statistics.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "courses": [
    {
      "id": "uuid",
      "courseName": "Healthcare Data Fundamentals",
      "provider": "Coursera",
      "completionDate": "2025-12-15",
      "grade": 92.5,
      "certificateUrl": "https://..."
    }
  ],
  "totalCourses": 5,
  "averageGrade": 88.5
}
```

---

### `POST /api/courses`
Add a new course.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "courseName": "Healthcare Data Fundamentals",
  "provider": "Coursera",
  "completionDate": "2025-12-15",
  "grade": 92.5,
  "certificateUrl": "https://..."
}
```

**Response:** `201 Created`

---

### `PUT /api/courses/{id}`
Update a course.

**Auth Required:** Yes (JWT)

---

### `DELETE /api/courses/{id}`
Delete a course.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "message": "Course deleted successfully",
  "success": true
}
```

---

## Projects API (`/api/projects`)

### `GET /api/projects/me`
Get all user's projects.

**Auth Required:** Yes (JWT)

---

### `POST /api/projects`
Add a new project.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "projectTitle": "EHR Data Quality Assessment",
  "description": "Analyzed and improved EHR data quality...",
  "startDate": "2025-06-01",
  "endDate": "2025-08-15",
  "technologies": ["Python", "SQL", "Pandas"],
  "complexity": "INTERMEDIATE",
  "githubUrl": "https://github.com/...",
  "liveUrl": null
}
```

---

### `PUT /api/projects/{id}`
Update a project.

**Auth Required:** Yes (JWT)

---

### `DELETE /api/projects/{id}`
Delete a project.

**Auth Required:** Yes (JWT)

---

## Certifications API (`/api/certifications`)

### `GET /api/certifications/me`
Get all user's certifications.

**Auth Required:** Yes (JWT)

---

### `POST /api/certifications`
Add a new certification.

**Auth Required:** Yes (JWT)

**Request Body:**
```json
{
  "certificationName": "AWS Certified Cloud Practitioner",
  "issuingOrganization": "Amazon Web Services",
  "issueDate": "2025-06-15",
  "expiryDate": "2028-06-15",
  "credentialId": "ABC123XYZ",
  "credentialUrl": "https://..."
}
```

---

### `DELETE /api/certifications/{id}`
Delete a certification.

**Auth Required:** Yes (JWT)

---

## Recommendations API (`/api/recommendations`)

### `GET /api/recommendations/courses`
Get personalized course recommendations.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "recommendedCourses": [
    {
      "courseId": "course_001",
      "title": "HL7 and FHIR Standards Mastery",
      "domain": "healthcare_technology",
      "difficulty": "Intermediate",
      "durationWeeks": 6,
      "skillsCovered": ["HL7 Protocol", "FHIR Standards"],
      "explanation": "Essential for healthcare data interoperability...",
      "youtubeLink": "https://youtube.com/..."
    }
  ],
  "generatedAt": "2026-01-18T10:30:00Z"
}
```

---

### `GET /api/recommendations/projects`
Get personalized project recommendations.

**Auth Required:** Yes (JWT)

**Response:** `200 OK`
```json
{
  "recommendedProjects": [
    {
      "projectId": "project_001",
      "title": "EHR Data Quality Assessment",
      "domain": "healthcare_technology",
      "difficulty": "Intermediate",
      "complexity": "medium",
      "durationWeeks": 4,
      "skillsRequired": ["Healthcare Data Standards", "SQL"],
      "explanation": "Hands-on experience with real healthcare data..."
    }
  ]
}
```

---

# 🤖 ML Model 1 - Skill Intelligence API

**Base URL:** `http://localhost:8001`

## `GET /`
Health check endpoint.

**Response:** `200 OK`
```json
{
  "status": "Skill Intelligence API running 🚀"
}
```

---

## `POST /skillPredict`
Predict skill gap, time to readiness, and recommended skills.

**Request Body:**
```json
{
  "education_level": 2,
  "field_of_study": 1,
  "percentage": 85.5,
  
  "has_ehr": 1,
  "has_hl7_fhir": 0,
  "has_medical_imaging": 0,
  "has_healthcare_security": 1,
  "has_telemedicine": 0,
  
  "has_iot_sensors": 0,
  "has_drone_ops": 0,
  "has_precision_ag": 0,
  "has_crop_modeling": 0,
  "has_soil_analysis": 0,
  
  "has_gis": 1,
  "has_smart_grid": 0,
  "has_traffic_mgmt": 0,
  "has_urban_iot": 0,
  "has_building_auto": 0,
  
  "num_courses": 5,
  "avg_course_grade": 88.5,
  "num_projects": 3,
  "avg_project_complexity": 2.5,
  "num_certifications": 2,
  
  "has_communication": 1,
  "has_teamwork": 1,
  "has_problem_solving": 1,
  "has_leadership": 0,
  
  "target_sector": 0,
  "target_role": 2
}
```

**Field Encodings:**

| Field | Values |
|-------|--------|
| `education_level` | 0=High School, 1=Diploma, 2=Bachelors, 3=Masters, 4=PhD |
| `target_sector` | 0=Healthcare, 1=Agriculture, 2=Urban/Smart City |
| `has_*` fields | 0=No, 1=Yes |

**Response:** `200 OK`
```json
{
  "skill_gap_score": 8.97,
  "time_to_ready_months": 2.39,
  "recommended_skills": [
    {"skill": "Budget Planning", "confidence": 16.4},
    {"skill": "Clinical Trials", "confidence": 14.03},
    {"skill": "Healthcare Analytics", "confidence": 10.8}
  ],
  "status": "Ready"
}
```

**Status Values:**
- `"Ready"` - skill_gap < 10
- `"Almost Ready"` - skill_gap < 25
- `"Needs Improvement"` - skill_gap >= 25

---

# 🤖 ML Model 2 - Recommendation System

**Base URL:** `http://localhost:8002`

## `GET /`
API information endpoint.

**Response:** `200 OK`
```json
{
  "name": "Role-Centric Recommendation System",
  "version": "1.0.0",
  "description": "Educational course and project recommendations driven by target role",
  "endpoints": {
    "post_recommendations": "/recommendations",
    "health": "/health",
    "sectors": "/info/sectors",
    "roles": "/info/roles/{sector}",
    "docs": "/docs"
  }
}
```

---

## `GET /health`
Health check endpoint.

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2026-01-18T10:30:00.000Z"
}
```

---

## `POST /recommendations`
Get personalized learning recommendations.

**Request Body:**
```json
{
  "user_id": "user-uuid-123",
  "education_level": "bachelors",
  "field_of_study": "Computer Science",
  "percentage": 85.5,
  
  "has_ehr": true,
  "has_hl7_fhir": false,
  "has_medical_imaging": false,
  "has_healthcare_security": true,
  "has_telemedicine": false,
  
  "has_iot_sensors": false,
  "has_drone_ops": false,
  "has_precision_ag": false,
  "has_crop_modeling": false,
  "has_soil_analysis": false,
  
  "has_gis": true,
  "has_smart_grid": false,
  "has_traffic_mgmt": false,
  "has_urban_iot": false,
  "has_building_auto": false,
  
  "num_courses": 5,
  "avg_course_grade": 88.5,
  "courses_names": ["Healthcare Data Fundamentals", "SQL for Data Analysis"],
  
  "num_projects": 3,
  "avg_project_complexity": "intermediate",
  
  "num_certifications": 2,
  "certification_names": ["AWS Cloud Practitioner"],
  
  "has_communication": true,
  "has_teamwork": true,
  "has_problem_solving": true,
  "has_leadership": false,
  
  "target_sector": "healthcare_technology",
  "target_role": "health_data_analyst"
}
```

**Valid Sectors:**
- `healthcare_technology`
- `agricultural_sciences`
- `urban_smart_city`

**Valid Education Levels:**
- `high_school`, `diploma`, `bachelors`, `masters`, `phd`

**Response:** `200 OK`
```json
{
  "user_id": "user-uuid-123",
  "target_role": "health_data_analyst",
  "target_sector": "healthcare_technology",
  "recommended_courses": [
    {
      "course_id": "course_001",
      "title": "HL7 and FHIR Standards Mastery",
      "domain": "healthcare_technology",
      "difficulty": "Intermediate",
      "duration_weeks": 6,
      "skills_covered": ["HL7 Protocol", "FHIR Standards", "Data Exchange"],
      "explanation": "Critical for healthcare data interoperability..."
    }
  ],
  "recommended_projects": [
    {
      "project_id": "project_001",
      "title": "EHR Data Quality Assessment",
      "domain": "healthcare_technology",
      "difficulty": "Intermediate",
      "complexity": "medium",
      "duration_weeks": 4,
      "skills_required": ["Healthcare Data Standards", "SQL"],
      "explanation": "Practical experience with real-world healthcare data..."
    }
  ],
  "reasoning": "Based on your target role as Health Data Analyst...",
  "generated_at": "2026-01-18T10:30:00.000Z"
}
```

---

## `GET /info/sectors`
List available sectors.

**Response:** `200 OK`
```json
{
  "sectors": [
    {
      "id": "healthcare_technology",
      "name": "Healthcare Technology",
      "description": "Healthcare IT, medical data, clinical systems"
    },
    {
      "id": "agricultural_sciences",
      "name": "Agricultural Sciences",
      "description": "Precision agriculture, farm automation, crop analytics"
    },
    {
      "id": "urban_smart_city",
      "name": "Urban / Smart City Planning",
      "description": "Smart cities, IoT infrastructure, urban analytics"
    }
  ]
}
```

---

## `GET /info/roles/{sector}`
List available roles for a sector.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sector` | string | Sector ID |

**Example:** `GET /info/roles/healthcare_technology`

**Response:** `200 OK`
```json
{
  "sector": "healthcare_technology",
  "roles": [
    {
      "id": "health_data_analyst",
      "name": "Health Data Analyst",
      "core_responsibilities": [
        "Analyze healthcare data",
        "Generate insights from EHR systems"
      ]
    },
    {
      "id": "clinical_informatics_specialist",
      "name": "Clinical Informatics Specialist",
      "core_responsibilities": [...]
    }
  ]
}
```

---

# 🤖 ML Model 3 - Career Insights API

**Base URL:** `http://localhost:8003`

## `GET /`
Root endpoint with API information.

**Response:** `200 OK`
```json
{
  "message": "Welcome to Career Intelligence API",
  "docs": "/docs",
  "redoc": "/redoc",
  "health": "/api/v1/health"
}
```

---

## `GET /api/v1/health`
Health check endpoint.

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "service": "Career Intelligence API"
}
```

---

## `POST /api/v1/insights`
Generate AI-powered career insights.

**Request Body:**
```json
{
  "skill_gap": {
    "skill_gap_score": 8.97,
    "time_to_ready_months": 2.39,
    "recommended_skills": [
      {"skill": "Budget Planning", "confidence": 16.4},
      {"skill": "Clinical Trials", "confidence": 14.03},
      {"skill": "Healthcare Analytics", "confidence": 10.8}
    ],
    "status": "Ready"
  },
  "career_recommendation": {
    "target_role": "health_data_analyst",
    "target_sector": "healthcare_technology",
    "recommended_courses": [
      {
        "title": "HL7 and FHIR Standards Mastery",
        "difficulty": "Intermediate",
        "duration_weeks": 6,
        "skills_covered": ["HL7 Protocol", "FHIR Standards"]
      }
    ],
    "recommended_projects": [
      {
        "title": "EHR Data Quality Assessment",
        "difficulty": "Intermediate",
        "duration_weeks": 4,
        "skills_required": ["Healthcare Data Standards", "SQL"]
      }
    ]
  }
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "insights": [
    {
      "insight_type": "Market-Weighted Skill Priority",
      "title": "Budget Planning: High-Impact Skill Gap",
      "insight": "Budget Planning appears in 73% of Health Data Analyst job postings but only 30% of candidates possess this skill.",
      "why_it_is_overlooked": "Most professionals focus on technical skills and underestimate the importance of financial acumen in healthcare roles.",
      "recommended_action": "Complete a healthcare budgeting course within the next 30 days to differentiate yourself from other candidates."
    },
    {
      "insight_type": "Interview Risk Alert",
      "title": "Clinical Trials Knowledge Gap",
      "insight": "Your profile shows limited clinical trials experience, a common interview failure point for healthcare analyst roles.",
      "why_it_is_overlooked": "Candidates assume general analytics skills transfer directly to clinical contexts.",
      "recommended_action": "Complete the 'Clinical Trials 101' module and build a portfolio project analyzing public trial data."
    }
  ],
  "meta": {
    "total_insights": 5,
    "target_role": "health_data_analyst",
    "skill_gap_score": 8.97,
    "demo": false
  }
}
```

**Insight Types:**
- `Market-Weighted Skill Priority`
- `Course vs Project Market ROI`
- `Interview Risk Alert`
- `Skill Timing & Freshness`
- `Adjacent Market Opportunity`

---

## `POST /api/v1/insights/demo`
Test endpoint with sample data.

**Request Body:** None required

**Response:** Same as `/api/v1/insights` with `"demo": true` in meta

---

# 🔧 Error Responses

## Standard Error Format

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2026-01-18T10:30:00Z"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Missing or invalid token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Resource already exists |
| `422` | Unprocessable Entity - Validation failed |
| `500` | Internal Server Error |

---

# 📊 Frontend Service Configuration

## API Configuration (`src/services/api.js`)

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Token automatically added from localStorage
// Key: 'skillpath_token'
```

## Insights Service (`src/services/insightsService.js`)

```javascript
const insightsApi = axios.create({
  baseURL: 'http://localhost:8003',
  timeout: 60000, // Longer timeout for LLM processing
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_INSIGHTS_API_URL=http://localhost:8003
```

---

# 🚀 Quick Start

## Start All Services

```bash
# Terminal 1 - Frontend
cd Frontend && npm install && npm run dev

# Terminal 2 - Backend
cd Backend && ./mvnw spring-boot:run

# Terminal 3 - ML Model 1
cd ML/model1_skill_recommendation/backend && source myenv_mac/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8001 --reload

# Terminal 4 - ML Model 2
cd ML/model2_recommendation_system && source venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8002 --reload

# Terminal 5 - ML Model 3
cd ML/model3_suggestions && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8003 --reload
```

## Verify Services

```bash
# Check all ports
lsof -i :5173 -i :8080 -i :8001 -i :8002 -i :8003 -P -n | grep LISTEN
```

---

# 📝 API Documentation URLs

| Service | Swagger UI | ReDoc |
|---------|------------|-------|
| Backend | N/A | N/A |
| ML Model 1 | http://localhost:8001/docs | http://localhost:8001/redoc |
| ML Model 2 | http://localhost:8002/docs | http://localhost:8002/redoc |
| ML Model 3 | http://localhost:8003/docs | http://localhost:8003/redoc |

---

## 📄 License

MIT License - Career Saarthi Team
