# WordLift

## Overview

WordLift is a cutting-edge content enhancement platform that empowers writers, marketers, and content creators to produce high-quality, SEO-optimized content with ease. Our frontend application delivers a seamless, intuitive interface for interacting with WordLift's powerful AI engine, providing real-time writing assistance that improves tone, grammar, clarity, and structure while optimizing for search engine visibility.
Built with modern web technologies and designed with user experience at its core, the WordLift frontend offers a distraction-free writing environment where AI-powered suggestions appear exactly when needed. Whether you're drafting blog posts, creating marketing copy, or writing documentation, WordLift helps you communicate more effectively while ensuring your content ranks well in search results.

## Features

- Real-Time Writing Enhancement
- Tone Analysis & Adjustment: Analyze and adjust your content's tone to match your target audience—professional, casual, persuasive, informative, and more.
- Grammar & Style Correction: Get instant fixes for grammar errors, awkward phrasing, and stylistic inconsistencies.
- Clarity Optimization: Receive suggestions to improve readability through sentence restructuring, simplification of complex ideas, and elimination of ambiguity.
- Structure Recommendations: Get AI-driven guidance on paragraph organization, content flow, and logical progression of ideas.

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **UI Components**: Custom UI components with shadcn/ui
- **State Management**: React Query
- **Authentication**: Custom auth flow
- **Payment Processing**: Paystack integration

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wordlift.git
cd frontend
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL=your_professional_plan_id
NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE=your_enterprise_plan_id

NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL_PRICE=your_professional_plan_price
NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE_PRICE=your_enterprise_plan_price

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
.
├── public/           # Static assets
├── src/
│   ├── _api/         # API service layer
│   ├── app/          # Next.js app router pages and components
│   │   ├── (auth)/   # Authentication routes (login/signup)
│   │   ├── board/    # Main application dashboard
│   │   └── plans/    # Subscription plans and pricing
│   ├── components/   # Shared UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility libraries
│   └── utils/        # Helper functions
```

## Authentication

The application includes a complete authentication system with login and signup functionality. Users must authenticate before accessing the main board features.

## Subscription Plans

WordLift offers tiered subscription plans:
- **Professional**: For growing businesses
- **Enterprise**: For established organizations

Plans can be managed through the `/board/plans` route where users can upgrade, downgrade, or manage their current subscription.

## Deployment

This application is configured for easy deployment on Vercel:

```bash
vercel
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend API |
| `NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL` | Paystack ID for the Professional plan |
| `NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE` | Paystack ID for the Enterprise plan |
| `NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL_PRICE` | Price of the Professional plan |
| `NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE_PRICE` | Price of the Enterprise plan |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Your Paystack public key |

## License

[MIT](LICENSE)
