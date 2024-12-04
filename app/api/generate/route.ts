import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const systemPrompt = `You are a flashcard creator. You take in text and create multiple flashcards from it. Make sure to create exactly 12 flashcards. The front should have an interesting important and conceptual question related to that topic. Don't repeat similar questions. Both front and back should be one sentence long. You should return in the following JSON format:
{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`;

export async function POST(req: Request) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 
    const data = await req.text(); 

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data }
      ],
      response_format: { type: 'json_object' }, 
    });

    let flashcards;
    try {
      flashcards = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      throw new Error('Failed to parse flashcards JSON');
    }

    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Error creating flashcards:", error);
    return NextResponse.json({ error: error || "Failed to generate flashcards" }, { status: 500 });
  }
}