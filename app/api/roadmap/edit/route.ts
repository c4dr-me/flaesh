import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Request Body:', body);

    const { id, newName } = body;

    
    const updatedFlashcard = await prisma.roadmap.update({
      where: { id },
      data: { topic: newName }, 
    });

    console.log('Updated Flashcard:', updatedFlashcard);

    return new Response(JSON.stringify(updatedFlashcard), { status: 200 });
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return new Response(
      JSON.stringify({ message: 'Error updating flashcard', error: error}),
      { status: 500 }
    );
  }
}
