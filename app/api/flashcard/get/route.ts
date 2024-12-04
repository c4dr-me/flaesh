import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server'; 

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: 'User not authenticated' }), { status: 401 });
  }

  try {
    if (id) {
      const flashcard = await prisma.flashcard.findUnique({
        where: { id: Number(id), userId: userId }, 
      });

      if (!flashcard) {
        return new Response(JSON.stringify({ message: 'Flashcard not found' }), { status: 404 });
      }

      return new Response(JSON.stringify(flashcard), { status: 200 });
    }

   
    const flashcards = await prisma.flashcard.findMany({
      where: { userId: userId },
    });

    return new Response(JSON.stringify(flashcards), { status: 200 });
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return new Response(JSON.stringify({ message: 'Error fetching flashcards', error }), { status: 500 });
  }
}
