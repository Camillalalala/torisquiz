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

## Project Structure

```
toriquiz2/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions and configurations
│   └── App.tsx        # Main application component
├── supabase/
│   └── functions/     # Supabase Edge Functions
└── public/            # Static assets
```

## Quiz Flow

1. Environmental Triggers
   - Users select factors that trigger discomfort

2. Desired Feelings
   - Users choose how they want to feel in their space

3. Color Preferences
   - Users select preferred color schemes
   - Generates a personalized color palette

4. Functional Needs
   - Users identify their space requirements

5. Lighting Preferences
   - Users choose their preferred lighting style

## Results Page

The results page displays:
- Generated color palette
- Mood board with inspiration images
- Furniture recommendations
- Personalized suggestions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
=======

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

