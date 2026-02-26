import { NextResponse } from "next/server";
import { openaiTextToImage } from "@/lib/openai-image-generate";

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  const buffer = await openaiTextToImage(prompt);

  if (!buffer) {
    return NextResponse.json(
      { error: "Зураг үүсгэж чадсангүй" },
      { status: 500 },
    );
  }
  const base64Image = buffer.toString("base64");
  return NextResponse.json({ image: `data:image/png;bas64, ${base64Image}` });
};
