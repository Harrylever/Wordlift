# WordLift Backend

This repository contains the backend API for WordLift, a SaaS platform that that empowers writers, marketers, and content creators to produce high-quality, SEO-optimized content with ease.

## Technologies

- **Framework**: FastAPI
- **Language**: Python 3.13
- **Database ORM**: SQLAlchemy
- **Authentication**: JWT
- **Payment Processing**: Paystack
- **AI Integration**: Google API

## Project Structure

```
.
├── app/
│   ├── api/                    # API routes
│   │   ├── agents.py           # AI agent endpoints
│   │   ├── auth.py             # Authentication endpoints
│   │   ├── health.py           # Health check endpoint
│   │   ├── subscriptions.py    # Subscription management endpoints
│   │   └── user.py             # User management endpoints
│   ├── core/                   # Core application settings
│   │   ├── config.py           # Configuration settings
│   │   └── security.py         # Security utilities
│   ├── db/                     # Database configuration
│   │   ├── init_db.py          # Database initialization
│   │   └── session.py          # Database session management
│   ├── main.py                 # Application entry point
│   ├── orm/                    # Object-Relational Mapping
│   │   ├── dtos/               # Data Transfer Objects
│   │   │   ├── ai_client/      # AI client DTOs
│   │   │   └── auth/           # Authentication DTOs
│   │   ├── models/             # Database models
│   │   └── repositories/       # Repository pattern implementations
│   ├── services/               # Business logic services
│   │   ├── agents.py           # AI agent services
│   │   ├── ai_client.py        # AI client implementation
│   │   ├── auth.py             # Authentication services
│   │   ├── subscription.py     # Subscription services
│   │   └── user.py             # User services
│   ├── tasks/                  # Background tasks
│   │   └── cleanup.py          # Cleanup tasks
│   └── utils/                  # Utility functions
│       ├── clean_json_string.py
│       ├── parse_ai_stringified_response.py
│       └── parse_date.py
├── Procfile                    # Heroku deployment configuration
└── requirements.txt            # Project dependencies
```

## Prerequisites

- Python 3.13 or higher
- PostgreSQL database
- Paystack account
- Google API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database configuration
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/wordlift
DATABASE_URL_MIGRATION=postgresql://user:password@localhost:5432/wordlift

# AI service
GOOGLE_API_KEY=your_google_api_key

# CORS configuration
CORS_ORIGINS=http://localhost:3000

# Paystack integration
PAYSTACK_BACKEND_URL=https://api.paystack.co
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PLAN_CODE_PROFESSSIONAL=your_paystack_professional_plan_code
PAYSTACK_PLAN_CODE_ENTERPRISE=your_paystack_enterprise_plan_code
```

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wordlift.git
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

3. Install the dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables (create `.env` file as described above)

5. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the application is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get access token

### User Management
- `GET /users/me` - Get current user information
- `PUT /users/me` - Update current user information

### Subscription Management
- `GET /subscriptions` - Get user's subscription information
- `POST /subscriptions` - Create a new subscription
- `PUT /subscriptions/{subscription_id}` - Update subscription
- `DELETE /subscriptions/{subscription_id}` - Cancel subscription

### AI Agents
- `POST /agents/analysize` - Generate market insights

## Database Migrations

This project uses Alembic for database migrations:

```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head
```

## Development

### Code Style
This project follows the PEP 8 style guide. Use `black` and `flake8` for code formatting:

```bash
# Format code
black app/

# Check code style
flake8 app/
```

### Testing
Run tests using pytest:

```bash
pytest
```

## Deployment

### Heroku
The repository includes a `Procfile` for Heroku deployment. Deploy to Heroku using:

```bash
git push heroku main
```

### Docker
A Dockerfile is available for containerized deployment:

```bash
# Build the image
docker build -t backend .

# Run the container
docker run -p 8000:8000 --env-file .env backend
```

## Integration with Frontend

This backend is designed to work with the WordLift frontend application. The frontend communicates with this API using the base URL specified in the frontend's environment variables.

## License

[MIT](LICENSE)
