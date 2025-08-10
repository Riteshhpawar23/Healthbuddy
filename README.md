# Healthbuddy 🧘‍♂️💬

*Find Your Calm in the Chaos.*

Healthbuddy is an AI-powered mental wellness companion designed to provide a safe, supportive, and interactive space. It's a place to understand your feelings, learn coping strategies, and connect with resources that can help. You are not alone on your wellness journey.

## ✨ Key Features

* *🧠 AI-Powered Chat:* Engage in meaningful conversations with Healthbuddy, an AI fine-tuned to understand and discuss mental wellness topics in a safe and supportive manner.
* *⚕️ Doctor Consultation:* Easily find and get contact information for qualified healthcare professionals in various specialties.
* *🎨 Doodle Interface:* A creative outlet to express yourself through drawing with various tools and colors.
* *🎵 Music Therapy:* A curated library of calming music and nature sounds to help you relax, focus, or sleep.
* *📓 Digital Journaling:* A private and secure space to write down your thoughts, track your mood, and reflect on your day.

## 🚀 Technology Stack

This project combines a modern frontend with a powerful, fine-tuned AI backend.

### Frontend

* *Framework:* [React](https://react.dev/) with [Vite](https://vitejs.dev/)
* *Language:* [TypeScript](https://www.typescriptlang.org/)
* *UI Components:* [shadcn/ui](https://ui.shadcn.com/)
* *Styling:* [Tailwind CSS](https://tailwindcss.com/)
* *Routing:* [React Router](https://reactrouter.com/)
* *State Management:* [TanStack Query](https://tanstack.com/query/)

### Backend

* *Framework:* [FastAPI](https://fastapi.tiangolo.com/)
* *Language Model:* A fine-tuned *Phi-3 Mini* model.
* *Fine-Tuning:* Optimized using *QLoRA* for 4-bit precision.
* *AI Pipeline:* Utilizes a *Retrieval-Augmented Generation (RAG)* pipeline with a Vector Database, trained on over 20,000 health-related conversations.
* *Safety:* Incorporates PII and safety filters.
* *Deployment:* Served via a secure tunnel using *Cloudflare*.

## ⚙️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

* Node.js (v18.0.0 or higher)
* npm (or your preferred package manager like Yarn, pnpm)

### Installation & Setup

1.  *Clone the repository:*
    sh
    git clone [https://github.com/riteshhpawar23/healthbuddy.git](https://github.com/riteshhpawar23/healthbuddy.git)
    

2.  *Navigate to the project directory:*
    sh
    cd healthbuddy/Healthbuddy-da8a705c5b97aa658e5e487d632b40202e5e671d
    

3.  *Install frontend dependencies:*
    sh
    npm install
    

4.  *Set up environment variables:*
    Create a .env file in the root of the project (Healthbuddy-da8a705c5b97aa658e5e487d632b40202e5e671d). This file will store your API endpoint and key.

    env
    # The URL of your FastAPI backend
    VITE_API_BASE_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)

    # Your API Key for the backend service
    VITE_API_KEY=your_secret_api_key_here
    
    Note: The frontend is configured to proxy requests from /api to the VITE_API_BASE_URL. Refer to vite.config.ts for details.

### Running the Application

1.  *Start the frontend development server:*
    sh
    npm run dev
    
2.  Open your browser and navigate to http://localhost:8080 (or the port specified in your terminal).

## Scripts

* npm run dev: Starts the development server.
* npm run build: Builds the app for production.
* npm run lint: Lints the code using ESLint.
* npm run preview: Serves the production build locally.

## 🤝 Made by Strawhats
