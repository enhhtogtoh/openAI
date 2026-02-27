
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("Error fetching image");
    }

    const imageUrl = response.data[0].url;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error generating the image", error);

    return NextResponse.json({ error: error || "Failed" }, { status: 500 });
  }
}
 