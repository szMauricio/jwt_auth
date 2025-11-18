# 🔐 Authentication System - Spring Boot & Angular

A full-stack authentication system built with Spring Boot backend and Angular frontend, featuring JWT authentication, password recovery, and a modern UI.

## 🚀 Features

### Backend
- **JWT Authentication** - Secure token-based authentication
- **User Registration & Login** - Complete auth flow
- **Password Recovery** - Email-based password reset
- **Role-based Authorization** - USER and ADMIN roles
- **PostgreSQL Database** - Persistent data storage
- **Email Service** - SMTP integration for password reset
- **Input Validation** - Comprehensive request validation
- **CORS Configuration** - Cross-origin resource sharing

### Frontend
- **Modern UI** - Angular Material design components
- **Responsive Design** - Mobile-friendly interface
- **Route Protection** - Auth guards for secure navigation
- **JWT Management** - Automatic token handling
- **Form Validation** - Reactive forms with validation
- **User Dashboard** - Protected user area
- **Notification System** - Snackbar notifications

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.5.7**
- **Spring Security**
- **Spring Data JPA**
- **PostgreSQL**
- **JJWT**
- **Spring Mail**
- **Maven**

### Frontend
- **Angular 18**
- **Angular Material**

## 📦 Installation

### Prerequisites
- Java 21
- Node.js 18+
- PostgreSQL
- Angular CLI

### Backend Setup

1. **Clone the repository**
```bash

git clone <your-repo-url>
cd backend

```

2. **Configure database**
```sql

CREATE DATABASE authdb;

```

3. **Update application properties**
```properties

# src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/authdb
spring.datasource.username=your_username
spring.datasource.password=your_password

# Email configuration (Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password

```
4. **Run the application**
```bash

./mvnw spring-boot:run

```

Frontend Setup
1. **Navigate to frontend directory**
```bash

cd frontend

```

2. **Install dependencies**
```bash

npm install

```

3. **Start development server**
```bash

ng serve

```

4. **Access the application**
```text

http://localhost:4200

```

#### 🔧 API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /auth/register | User registration |
| POST | /auth/login | User login |
| POST | /auth/forgot-password | Password reset request |
| POST | /auth/reset-password | Password reset confirmation |
| GET | /auth/check-email | Email availability check |

### Request Examples

#### Register
```json

POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "role": "ROLE_USER"
}
```

#### Login
```json

POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```
#### Response
```json

{
  "token": "jwt_token_here",
  "type": "Bearer",
  "email": "user@example.com",
  "role": "ROLE_USER"
}
```

##🗂️ Project Structure
```text

backend/
├── src/main/java/com/auth/backend/
│   ├── config/          # Security configuration
│   ├── controllers/     # REST controllers
│   ├── dtos/           # Data transfer objects
│   ├── models/         # Entity models
│   ├── repositories/   # Data access layer
│   ├── services/       # Business logic
│   └── utils/          # JWT utilities
└── src/main/resources/
    └── application.properties

frontend/
├── src/app/
│   ├── features/
│   │   ├── auth/       # Authentication components
│   │   └── dashboard/  # Protected dashboard
│   ├── guards/         # Route protection
│   ├── models/         # TypeScript interfaces
│   ├── services/       # HTTP services
│   └── shared/         # Shared components
└── angular.json
```

## 🔐 Security Features

  - JWT-based stateless authentication
  - Password encryption with BCrypt
  - CORS configuration for frontend communication
  - Input validation and sanitization
  - Role-based access control
  - Secure password reset with time-limited tokens

## 🎨 UI Components

  - Login Form - Email and password authentication
  - Registration Form - New user account creation
  - Forgot Password - Password recovery flow
  - Reset Password - Secure password update
  - Dashboard - Protected user area with logout

## 📧 Email Configuration

The system uses Gmail SMTP for password reset emails. To configure:

  - Enable 2-factor authentication on your Gmail account
  - Generate an App Password
  - Update application.properties with your credentials

## 🚀 Deployment
Backend Deployment

  - Package: ./mvnw clean package
  - Deploy the generated JAR file to your server

Frontend Deployment

  - Build: ng build --prod
  - Deploy the dist/ folder to your web server



## 👨‍💻 Author

**szMauricio**  
GitHub: [@SzMauricio](https://github.com/szMauricio)  

---
