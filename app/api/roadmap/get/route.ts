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
      const roadmap = await prisma.roadmap.findUnique({
        where: { id: Number(id), userId: userId },
      });

      if (!roadmap) {
        return new Response(JSON.stringify({ message: 'Roadmap not found' }), { status: 404 });
      }

      return new Response(JSON.stringify(roadmap), { status: 200 });
    }

    const roadmaps = await prisma.roadmap.findMany({
      where: { userId: userId },
    });

    return new Response(JSON.stringify(roadmaps), { status: 200 });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return new Response(JSON.stringify({ message: 'Error fetching roadmaps', error }), { status: 500 });
  }
}
