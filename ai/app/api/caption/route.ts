import OpenAI from "openai";
import { NextResponse } from "next/server";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { imageUrl, prompt } = await req.json();
    console.log({ imageUrl });
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt || "Монголоор тайлбарлаж бичнэ үү",
            },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 500,
    });
    const caption = response.choices[0]?.message?.content;
    return NextResponse.json({ output: caption });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Системийн алдаа гарлаа",
      },
      { status: 500 },
    );
  }
};
