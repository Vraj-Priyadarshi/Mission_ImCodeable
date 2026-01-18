# 🎯 Ingenium - AI-Powered Career Development Platform

An intelligent career development platform that provides personalized skill gap analysis, course recommendations, and project suggestions based on user profiles and career goals. Built for the Ingenium Hackathon.

---

## 📖 Project Overview

Ingenium is a comprehensive career development platform that leverages machine learning and AI to help professionals bridge their skill gaps and achieve their career goals. The platform analyzes user profiles, identifies skill deficiencies, recommends relevant courses and projects, and provides actionable insights for career progression.

### Key Capabilities
- **Intelligent Skill Gap Analysis**: ML-powered detection of missing skills based on target roles
- **Personalized Recommendations**: Role-centric course and project recommendations
- **Career Pathway Visualization**: Clear roadmap from current position to target role
- **Multi-Sector Support**: Specialized for Healthcare Technology, Agricultural Sciences, and Urban/Smart City Planning
- **Time-to-Readiness Prediction**: Estimates how long it takes to become job-ready
- **Secure Authentication**: JWT-based auth with OAuth2 (Google) integration

---

## ✨ Features

### 🔐 Authentication & User Management
- Email/password registration with verification
- Google OAuth2 social login
- JWT-based secure session management
- Password reset functionality
- Protected routes and role-based access

### 📊 Intelligent Dashboard
- Real-time skill gap visualization
- Personalized career pathway analysis
- Time-to-readiness metrics
- Progress tracking across multiple dimensions
- Skills overview with gap identification

### 🎓 Smart Recommendations
- **ML Model 1**: Skill gap prediction and missing skill identification
- **ML Model 2**: Role-centric course and project recommendations using LLM
- Context-aware filtering based on education level and experience
- Explainable recommendations with clear reasoning

### 👤 Comprehensive Onboarding
- Multi-step profile creation
- Education and certification tracking
- Technical and soft skills assessment
- Career goals definition
- Sector-specific customization

### 📈 Analytics & Insights
- Skill development tracking
- Course completion monitoring
- Project portfolio management
- Career progression analytics

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: TailwindCSS 4.1.18
- **UI/UX**: 
  - Framer Motion (animations)
  - Recharts (data visualization)
  - Lucide React (icons)
  - React Hot Toast (notifications)
- **State Management**: React Context API
- **Routing**: React Router DOM 7.12.0
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios 1.13.2

### Backend
- **Framework**: Spring Boot 4.0.1
- **Language**: Java 21
- **Security**: Spring Security + JWT + OAuth2
- **Database**: MySQL (JPA/Hibernate)
- **Email**: Spring Mail (SMTP)
- **Build Tool**: Maven
- **Additional**:
  - Lombok (boilerplate reduction)
  - Spring Validation
  - Spring DevTools

### ML Models

#### Model 1: Skill Intelligence API
- **Framework**: FastAPI
- **ML Libraries**: 
  - scikit-learn 1.6.1
  - NumPy 2.4.1
  - SciPy 1.17.0
- **Server**: Uvicorn
- **Models**:
  - Skill gap prediction
  - Time-to-readiness estimation
  - Missing skill classification

#### Model 2: Recommendation System
- **Framework**: FastAPI
- **AI**: LiteLLM 1.70.0 + OpenAI 1.68.2
- **Architecture**: Rule-based filtering + LLM ranking
- **Data**: JSON-based knowledge base (roles, courses, projects)

### Development Tools
- **Version Control**: Git
- **API Testing**: REST clients
- **Code Quality**: ESLint
- **Package Management**: npm, pip, Maven

---

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **Java**: JDK 21 or higher ([Download](https://adoptium.net/))
- **Maven**: 3.8.0 or higher ([Download](https://maven.apache.org/))
- **Python**: 3.10 or higher ([Download](https://www.python.org/))
- **MySQL**: 8.0 or higher ([Download](https://www.mysql.com/))
- **Git**: Latest version ([Download](https://git-scm.com/))

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "ingenium hackathon"
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE ingenium_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Backend Setup (Spring Boot)

Navigate to the Backend directory:

```bash
cd Backend
```

Copy the example configuration file:

```bash
copy src\main\resources\application.properties.example src\main\resources\application.properties
```

Edit `application.properties` with your values:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/ingenium_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

# JWT Secret (generate a secure base64 string)
jwt.secret=your_jwt_secret_base64_encoded
jwt.expiration-ms=2592000000

# Google OAuth2
spring.security.oauth2.client.registration.google.client-id=your_google_client_id
spring.security.oauth2.client.registration.google.client-secret=your_google_client_secret

# Email (Gmail example)
spring.mail.username=your_email@gmail.com
spring.mail.password=your_gmail_app_password

# External APIs
external.api.ml-recommendations.base-url=http://localhost:8000
external.api.skill-predict.base-url=http://localhost:8001
external.api.youtube.api-key=your_youtube_api_key
```

Install dependencies and run:

```bash
mvnw clean install
mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup (React + Vite)

Navigate to the Frontend directory:

```bash
cd ..\Frontend
```

Copy the example environment file:

```bash
copy .env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_APP_URL=http://localhost:5173
VITE_ENABLE_GOOGLE_AUTH=true
```

Install dependencies and run:

```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### 5. ML Model 1 Setup (Skill Prediction)

Navigate to the model directory:

```bash
cd ..\model1_skill_recommendation\backend
```

Create a virtual environment:

```bash
python -m venv myenv
myenv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn main:app --reload --port 8001
```

The API will start on `http://localhost:8001`

### 6. ML Model 2 Setup (Recommendations)

Navigate to the model directory:

```bash
cd ..\..\model2_recommendation_system
```

Create and activate virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

Create `.env` file:

```env
# LiteLLM Configuration
LLM_MODEL=gpt-4o-mini
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Use other providers
# ANTHROPIC_API_KEY=your_anthropic_key
# GEMINI_API_KEY=your_gemini_key
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn main:app --reload --port 8000
```

The API will start on `http://localhost:8000`

---

## 🎮 How to Run Locally

### Complete Startup Sequence

**Terminal 1 - MySQL Database**
```bash
# Start MySQL service (Windows)
net start MySQL80
```

**Terminal 2 - Backend**
```bash
cd Backend
mvnw spring-boot:run
```

**Terminal 3 - Frontend**
```bash
cd Frontend
npm run dev
```

**Terminal 4 - ML Model 1**
```bash
cd model1_skill_recommendation\backend
myenv\Scripts\activate
uvicorn main:app --reload --port 8001
```

**Terminal 5 - ML Model 2**
```bash
cd model2_recommendation_system
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **ML Model 1 API**: http://localhost:8001
- **ML Model 2 API**: http://localhost:8000
- **Backend API Docs**: http://localhost:8080/swagger-ui.html (if configured)
- **ML Model 1 Docs**: http://localhost:8001/docs
- **ML Model 2 Docs**: http://localhost:8000/docs

---

## 🔑 Environment Variables

### Backend (`Backend/src/main/resources/application.properties`)

```properties
# Application
spring.application.name=secure-starter
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/ingenium_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

# JWT
jwt.secret=your_jwt_secret_base64_encoded
jwt.expiration-ms=2592000000

# OAuth2
spring.security.oauth2.client.registration.google.client-id=your_google_client_id
spring.security.oauth2.client.registration.google.client-secret=your_google_client_secret
oauth2.redirect-uri=http://localhost:5173/oauth2/redirect

# CORS
cors.allowed-origins=http://localhost:3000,http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,PATCH,OPTIONS

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_gmail_app_password
app.email.from=noreply@yourapp.com

# External APIs
external.api.ml-recommendations.base-url=http://localhost:8000
external.api.skill-predict.base-url=http://localhost:8001
external.api.youtube.api-key=your_youtube_api_key
external.api.timeout-seconds=5
```

### Frontend (`Frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_APP_URL=http://localhost:5173
VITE_ENABLE_GOOGLE_AUTH=true
```

### ML Model 2 (`model2_recommendation_system/.env`)

```env
LLM_MODEL=gpt-4o-mini
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 👥 Test Login Credentials

For testing purposes, you can create a test account through the registration flow, or use the following test credentials (if seeded in your database):

### Option 1: Create New Account
1. Navigate to http://localhost:5173
2. Click "Sign Up"
3. Fill in the registration form
4. Verify your email (check console logs if using dev email configuration)
5. Complete the onboarding process

### Option 2: Use Google OAuth
1. Click "Continue with Google"
2. Sign in with your Google account
3. Complete the onboarding process

### Sample Test User (Manual Database Insert)
```sql
-- Note: Create this user manually if needed for testing
INSERT INTO users (email, password, first_name, last_name, is_verified, created_at) 
VALUES (
  'test@ingenium.com',
  '$2a$10$encrypted_password_here', -- Use BCrypt to generate
  'Test',
  'User',
  TRUE,
  NOW()
);
```

**Default test credentials** (if you seed the database):
- Email: `test@ingenium.com`
- Password: `TestPassword123!`

> **⚠️ Security Note**: Change or remove test credentials before deploying to production.

---

## 🐛 Error Handling

### Frontend Error Handling
- **Global Error Boundary**: Catches React component errors
- **API Error Interceptors**: Handles authentication failures and redirects
- **Toast Notifications**: User-friendly error messages via React Hot Toast
- **Form Validation**: Real-time validation with Zod schemas
- **Network Error Recovery**: Retry mechanisms for failed requests

### Backend Error Handling
- **Global Exception Handler**: Centralized error responses
- **Custom Exception Classes**: Domain-specific errors
- **Validation Errors**: Detailed field-level validation messages
- **Security Exceptions**: Proper handling of auth failures
- **Database Errors**: Transaction rollback and error logging

### ML API Error Handling
- **Input Validation**: Pydantic schemas for request validation
- **Model Loading Errors**: Graceful degradation if models fail to load
- **LLM Fallbacks**: Default responses if AI service is unavailable
- **Rate Limiting**: Protection against API abuse
- **Timeout Handling**: Configurable timeouts for external calls

### Common Issues & Solutions

#### Backend won't start
```bash
# Check if MySQL is running
net start MySQL80

# Verify database exists
mysql -u root -p
SHOW DATABASES;

# Check if port 8080 is available
netstat -ano | findstr :8080
```

#### Frontend can't connect to backend
```bash
# Verify backend is running
curl http://localhost:8080/api/health

# Check CORS settings in application.properties
# Ensure VITE_API_BASE_URL is correct in .env
```

#### ML models return errors
```bash
# Verify Python environment is activated
# Check if model files exist in models/ directory
# Ensure all dependencies are installed
pip list

# Check API is running
curl http://localhost:8001/docs
curl http://localhost:8000/docs
```

#### Database connection errors
```bash
# Verify credentials in application.properties
# Check MySQL service is running
# Ensure database exists and user has permissions
GRANT ALL PRIVILEGES ON ingenium_db.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🔒 Security Confirmation

### ✅ No Secrets in Repository

This repository has been configured to prevent accidental exposure of sensitive information:

#### Protected Files (in `.gitignore`)
- ✅ `Backend/src/main/resources/application.properties` - Contains database credentials, API keys
- ✅ `Backend/.env` - Environment-specific secrets
- ✅ `Frontend/.env` - API keys and OAuth credentials
- ✅ `model2_recommendation_system/.env` - OpenAI API keys
- ✅ `node_modules/` - Third-party dependencies
- ✅ `venv/`, `myenv/` - Python virtual environments
- ✅ `target/` - Build artifacts
- ✅ `*.log` - Application logs
- ✅ `.idea/`, `.vscode/` - IDE configurations

#### Template Files Provided
- ✅ `application.properties.example` - Configuration template for backend
- ✅ `Frontend/.env.example` - Environment variable template
- ✅ All example files contain placeholder values only

#### Security Best Practices Implemented
- ✅ JWT secrets are not hardcoded
- ✅ Database passwords are externalized
- ✅ OAuth2 credentials use environment variables
- ✅ API keys are loaded from configuration files
- ✅ CORS is properly configured for allowed origins
- ✅ Password hashing using BCrypt
- ✅ Input validation on all endpoints
- ✅ HTTPS support ready (configure in production)

### Before Deployment Checklist
- [ ] Generate strong JWT secret (minimum 256-bit)
- [ ] Use production database with strong credentials
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure proper CORS for production domain
- [ ] Set up secure email service (not Gmail)
- [ ] Rotate all API keys
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Review and restrict database permissions
- [ ] Enable SQL injection protection
- [ ] Configure CSP headers
- [ ] Set up backup strategy

---

## 📁 Project Structure

```
ingenium-hackathon/
├── Backend/                          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/hackathon/securestarter/
│   │   │   │   ├── config/           # Security, CORS, REST client config
│   │   │   │   ├── controller/       # REST API endpoints
│   │   │   │   ├── dto/              # Data transfer objects
│   │   │   │   ├── entity/           # JPA entities
│   │   │   │   ├── repository/       # Database repositories
│   │   │   │   ├── service/          # Business logic
│   │   │   │   ├── security/         # JWT, OAuth2 implementation
│   │   │   │   └── util/             # Utility classes
│   │   │   └── resources/
│   │   │       ├── application.properties.example
│   │   │       └── application.properties (gitignored)
│   │   └── test/                     # Unit and integration tests
│   └── pom.xml                       # Maven dependencies
│
├── Frontend/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Reusable components
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   └── onboarding/           # Onboarding flow
│   │   ├── pages/                    # Route pages
│   │   ├── services/                 # API service layers
│   │   ├── context/                  # React Context providers
│   │   └── assets/                   # Static assets
│   ├── .env.example
│   ├── .env (gitignored)
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── model1_skill_recommendation/      # ML Model 1 (Skill Prediction)
│   └── backend/
│       ├── main.py                   # FastAPI app
│       ├── models/                   # Pre-trained ML models
│       ├── requirements.txt
│       └── myenv/ (gitignored)       # Python virtual environment
│
├── model2_recommendation_system/     # ML Model 2 (Recommendations)
│   ├── main.py                       # FastAPI app
│   ├── recommendation_engine.py      # Core recommendation logic
│   ├── llm_service.py                # LLM integration
│   ├── models.py                     # Pydantic schemas
│   ├── config.py                     # Configuration
│   ├── knowledge_base/               # JSON data (roles, courses, projects)
│   ├── requirements.txt
│   ├── .env.example
│   └── .env (gitignored)
│
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

---

## 🧪 API Endpoints

### Backend (Spring Boot) - Port 8080

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login with credentials
- `POST /api/auth/verify-email` - Verify email with token
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/oauth2/authorization/google` - Initiate Google OAuth
- `GET /oauth2/callback/google` - Google OAuth callback

#### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `DELETE /api/users/me` - Delete user account

#### Onboarding
- `POST /api/onboarding/complete` - Submit complete onboarding data
- `GET /api/onboarding/status` - Check onboarding completion

#### Dashboard
- `GET /api/dashboard` - Get comprehensive dashboard data
- `GET /api/dashboard/refresh` - Refresh ML predictions

#### Profiles
- `GET /api/academics` - Get academic profile
- `POST /api/academics` - Create/update academic profile
- `GET /api/career` - Get career goals
- `POST /api/career` - Create/update career goals
- `GET /api/skills` - Get skill profile
- `POST /api/skills` - Update skills

#### Courses & Projects
- `GET /api/courses` - List user's courses
- `POST /api/courses` - Add course
- `PUT /api/courses/{id}` - Update course progress
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Add project

#### Certifications
- `GET /api/certifications` - List certifications
- `POST /api/certifications` - Add certification

#### Recommendations
- `POST /api/recommendations/refresh` - Get fresh recommendations

#### Analytics
- `GET /api/analytics/overview` - Get analytics overview

### ML Model 1 (Skill Prediction) - Port 8001

- `POST /predict` - Predict skill gap, time to readiness, and missing skills
  ```json
  {
    "target_role": "Data Scientist",
    "current_experience_years": 3,
    "education_level": "Bachelor",
    "technical_skill_count": 8,
    "soft_skill_count": 5,
    "course_count": 4,
    "certification_count": 2,
    "project_count": 3,
    "target_sector": "Healthcare"
  }
  ```

- `GET /health` - Health check endpoint

### ML Model 2 (Recommendations) - Port 8000

- `POST /recommendations` - Get personalized course and project recommendations
  ```json
  {
    "user_id": 123,
    "target_role": "AI/ML Engineer",
    "target_sector": "Healthcare Technology",
    "education_level": "Bachelor",
    "experience_years": 2,
    "current_skills": ["Python", "Machine Learning"],
    "completed_courses": []
  }
  ```

- `GET /health` - Health check endpoint

---

## 🎯 Core Features Explained

### 1. Skill Gap Analysis
Uses ML Model 1 to analyze the gap between current skills and target role requirements. Provides:
- Numerical skill gap score (0-100)
- Identification of top missing skills
- Prioritized skill recommendations

### 2. Time-to-Readiness Prediction
Predicts how many months of learning are needed to become job-ready based on:
- Current skill level
- Target role requirements
- Learning history
- Industry benchmarks

### 3. Role-Centric Recommendations
ML Model 2 provides personalized recommendations by:
1. Loading target role profiles from knowledge base
2. Filtering courses/projects by domain and role relevance
3. Matching based on education level and experience
4. Using LLM to rank and explain top recommendations
5. Returning 3 courses + 2 projects with explanations

### 4. Career Pathway Visualization
Visual representation of:
- Current position
- Intermediate milestones
- Required skill acquisitions
- Estimated timelines
- Target role achievement

### 5. Multi-Sector Support
Specialized knowledge bases for:
- **Healthcare Technology**: Medical AI, Health Informatics, Telemedicine
- **Agricultural Sciences**: Precision Agriculture, AgTech, Sustainable Farming
- **Urban Planning**: Smart Cities, Urban Analytics, Infrastructure

---

## 🔧 Development

### Running Tests

**Backend Tests**
```bash
cd Backend
mvnw test
```

**Frontend Tests** (if configured)
```bash
cd Frontend
npm test
```

### Building for Production

**Frontend**
```bash
cd Frontend
npm run build
# Output will be in dist/ folder
```

**Backend**
```bash
cd Backend
mvnw clean package
# JAR file will be in target/ folder
```

### Code Quality

**Frontend Linting**
```bash
cd Frontend
npm run lint
```

---

## 📊 Database Schema

Key entities:
- **User**: Authentication and profile data
- **AcademicProfile**: Education history
- **CareerProfile**: Career goals and target roles
- **SkillProfile**: Technical and soft skills
- **Course**: Enrolled courses with progress
- **Project**: Portfolio projects
- **Certification**: Professional certifications
- **Recommendation**: Cached ML recommendations

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📝 License

This project was developed for the Ingenium Hackathon.

---

## 👨‍💻 Contributors

Developed by the Ingenium Hackathon Team

---

## 🙏 Acknowledgments

- Spring Boot community
- React and Vite teams
- FastAPI framework
- OpenAI for LLM capabilities
- All open-source contributors

---

## 📞 Support

For issues, questions, or contributions, please contact the development team or create an issue in the repository.

---

**Happy Coding! 🚀**
