import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: 'ID is required.' }), { status: 400 });
    }

    await prisma.flashcard.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: 'Topic deleted successfully.' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return new Response(JSON.stringify({ message: 'Error deleting topic.' }), { status: 500 });
  }
}
