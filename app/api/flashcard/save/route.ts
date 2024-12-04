import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const { userId, topic, flashcards } = body;

    // console.log('Payload for Prisma:', { userId, topic, flashcards });

    const newFlashcards = await prisma.flashcard.create({
      data: {
        userId,
        topic,
        flashcards: flashcards,
      },
    });

    return new Response(JSON.stringify(newFlashcards), { status: 200 });
  } catch (error: any) {
    console.error('Error saving flashcards:', error);

    return new Response(
      JSON.stringify({ message: 'Error saving flashcards', error: error.message }),
      { status: 500 }
    );
  }
}
