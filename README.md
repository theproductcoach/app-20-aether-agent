# AI Travel Planner

An interactive travel planning application that uses AI to create personalized travel itineraries. Built with Next.js and Server-Sent Events (SSE) for real-time agent interactions.

## Features

- **Interactive Form**: Input your destination, dates, budget, and travel interests
- **Real-time Agent Thoughts**: Watch the AI agent's thought process in real-time
- **Live Narration**: Experience a narrative description of your travel plan as it's being created
- **Detailed Itineraries**: Receive day-by-day travel plans with activities
- **Currency Support**: Plan in multiple currencies (USD, EUR, GBP, JPY, AUD)
- **Interest Categories**: Customize your trip based on interests like History, Food, Nature, Art, and Relaxation

## Getting Started

1. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. Start the backend server (required for AI functionality):

```bash
# Navigate to the backend directory and start the server
# The backend should run on http://localhost:8000
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## How It Works

1. **Input Your Preferences**:
   - Enter your destination
   - Specify travel dates
   - Set your budget and preferred currency
   - Select your travel interests

2. **Watch the Planning Process**:
   - See the AI agent's thoughts in real-time
   - Read a narrative description of your trip
   - Get a structured day-by-day itinerary

3. **Review and Plan Again**:
   - View your complete travel plan
   - Start over to plan another trip

## Technical Details

- Built with Next.js 14 and React
- Uses Server-Sent Events (SSE) for real-time streaming
- TypeScript for type safety
- Tailwind-inspired styling system
- Responsive design for all devices

## Backend Requirements

The application expects a backend server running on `http://localhost:8000` that implements the following SSE endpoint:

```
GET /stream-plan?destination={}&dates={}&currency={}&budget={}&interests=[]
```

The backend should stream messages in the following formats:

- Thoughts: `{ type: "thought", content: "..." }`
- Narration: `{ type: "narration", content: "..." }`
- Final Plan: `{ type: "final", payload: { title: "...", days: [...] } }`
- Completion: `{ type: "done" }`

## Development

To modify the application, edit the following key files:

- `src/app/components/TravelForm.tsx` - Main form and display logic
- `src/app/page.module.css` - Styling definitions
- `src/app/page.tsx` - Page layout and routing

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
