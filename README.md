# ToriQuiz - Interior Design Quiz Application

A React-based quiz application that helps users discover their interior design preferences and generates personalized recommendations for their living space.

## Features

- Interactive quiz with multiple steps
- Personalized color palette generation
- Mood board recommendations
- Furniture suggestions
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd toriquiz2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard:
- Go to Project Settings > API
- Copy the "Project URL" for VITE_SUPABASE_URL
- Copy the "anon/public" key for VITE_SUPABASE_ANON_KEY

4. Deploy the Supabase Edge Function:
   - Go to your Supabase project dashboard
   - Navigate to Edge Functions
   - Click "New Function"
   - Name it "generate-color-palette"
   - Copy the contents of `supabase/functions/generate-color-palette/index.ts`
   - Click "Deploy"

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:8082
```
