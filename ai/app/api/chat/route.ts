import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import error from "next/error";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Mini Chatgpt" },
        { role: "user", content: prompt },
      ],
    });

    const text = response.choices[0].message.content;
    return NextResponse.json({ output: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong " },
      { status: 500 },
    );
  }
}
