# WordLift - AI Content Enhancer

## ✨ Features

- **AI-Powered Content Enhancer**: Enhancer Written Content with AI to improve your content and optimize for SEO in seconds.
- **User Authentication**: Secure authentication
- **Subscription Management**: Tiered subscription plans with Paystack payment integration
- **Credit System**: Token-based usage tracking for API calls
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🏗️ Architecture

The project is structured as a monorepo with separate frontend and backend directories:

```
WordLift/
├── frontend/       # Next.js 14 application
├── backend/        # FastAPI service
└── README.md       # This file
```

### Frontend (Next.js)

The frontend is built with Next.js 14 using the App Router, TypeScript, and TailwindCSS. It provides:

- Clean, intuitive dashboard interface
- Responsive design for all device sizes
- Copy and format controls for output customization
- Subscription plan management

### Backend (FastAPI)

The backend is powered by FastAPI and provides:

- RESTful API endpoints for all functionality
- PostgreSQL database integration
- Google AI (Gemini) integration for AI processing
- Paystack subscription handling
- Background tasks for subscription management

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18.0+
- PostgreSQL
- Paystack account
- Google AI (Gemini) API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on the example:
   ```bash
   DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/db_name
   DATABASE_URL_MIGRATION=postgresql://user:password@localhost:5432/db_name
   GOOGLE_API_KEY=your_google_api_key
   CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
   PAYSTACK_BACKEND_URL=https://api.paystack.co
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   ```

5. Run database migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8080
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```

3. Create a `.env.local` file:
   ```
  NEXT_PUBLIC_API_BASE_URL=
  NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL=
  NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE=
  NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL_PRICE=
  NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE_PRICE=
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💰 Subscription Plans

WordLift offers two subscription tiers:

- **Professional Plan**: 200 credits per month
- **Enterprise Plan**: 500 credits per year (20% savings)

## 📚 Documentation

- Backend API: [http://localhost:8080/docs](http://localhost:8080/docs) (when running locally)
- Detailed documentation for both frontend and backend can be found in their respective directories

## 🚢 Deployment

### Backend Deployment

```bash
uvicorn app.main:app --workers 4 --host 0.0.0.0 --port 8080
```

### Frontend Deployment

The frontend is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project into Vercel
3. Configure environment variables
4. Deploy

## 📝 License

[MIT](LICENSE)
