import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.json();

  try {
    const response = await fetch("https://app-20-aether-agent-backend.onrender.com/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error contacting LangGraph backend:", error);
    return NextResponse.json({ error: "Failed to contact LangGraph backend" }, { status: 500 });
  }
}
