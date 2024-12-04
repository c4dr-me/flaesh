import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, topic, roadmapData } = await req.json();

    console.log('Received Data:', { userId, topic, roadmapData });

    if (!userId || !topic || !roadmapData) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const newRoadmap = await prisma.roadmap.create({
      data: {
        userId,
        topic,
        roadmapData,
      },
    });

    return new Response(JSON.stringify(newRoadmap), { status: 200 });
  } catch (error) {
    console.error('Error saving roadmap:', error);
    return new Response(JSON.stringify({ message: 'Error saving roadmap', error }), { status: 500 });
  }
}
