# Technical Team Skill Check-in 💜✨

Welcome to the Technical Team Skill Check-in project! This application provides a beautiful, multi-page form to assess and understand the current skills and learning aspirations of team members.

## Features

- **Beautiful UI**: Aesthetic design with a pink and purple theme 🌸💜
- **Multi-Page Form**: Separates the questionnaire into sections for improved UX
- **Backend Integration**: Stores responses locally in a JSON file
- **Admin Panel**: View all submitted responses at `/admin`
- **Mobile Responsive**: Works beautifully on all devices

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Access Admin Page

- Visit `/admin` to access the admin panel and view all submissions
- No authentication required for demo purposes

## Deployment

You can deploy this application using platforms like Vercel or Netlify. The application is designed to work with static/dynamic rendering.

## Data Storage

Responses are stored in `data/survey-responses.json`. In production, consider using a real database or backend service.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
