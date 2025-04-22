import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { destination, dates, budget, interests, currency } = data;

    const prompt = `
You are a smart travel agent AI. Plan a ${dates}-length trip to ${destination} with a budget of ${budget} ${currency}.
The traveller is interested in: ${interests.join(", ") || "a mix of experiences"}.

Return the response as JSON with this structure:
{
  "itinerary": [
    { "day": "Day 1", "plan": "..." },
    { "day": "Day 2", "plan": "..." },
    ...
  ],
  "totalCost": "formatted string like '£450 GBP'",
  "agentThoughts": ["short bullet points explaining how you made decisions"]
}
Only return valid JSON. Do not include any text outside the JSON.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        { role: "system", content: "You are a helpful travel planning assistant." },
        { role: "user", content: prompt }
      ]
    });

    const rawText = completion.choices[0].message?.content || "";
    const parsed = JSON.parse(rawText);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("OpenAI error:", error);
    return NextResponse.json(
      { error: "Something went wrong generating the itinerary." },
      { status: 500 }
    );
  }
}
