import React, { useState, useEffect } from 'react';
import { ReactFlow, Controls, Background, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Flashcard from './Flashcard';
import { BadgeAlert, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Loader from './loader';

interface RoadmapStep {
  id: number;
  step: string;
  timeline?: string;
  description?: string;
  left?: RoadmapStep | null;
  right?: RoadmapStep | null;
}

interface RoadmapTreeProps {
  roadmapData: {
    value: RoadmapStep;
    left?: RoadmapTreeProps['roadmapData'] | null;
    right?: RoadmapTreeProps['roadmapData'] | null;
  };
}

interface FlashcardProps {
  front: string;
  back: string;
}

const TreeLayout: React.FC<RoadmapTreeProps> = ({ roadmapData }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [flashcard, setFlashcard] = useState<{ step: string; timeline?: string; description?: string } | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  console.log(roadmapData);

  useEffect(() => {
    const generateTree = (
      step: RoadmapTreeProps['roadmapData'],
      parentId: string | null,
      posX: number,
      posY: number,
      occupiedPositions: Set<string>
    ): [Node[], Edge[]] => {
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      const nodeId = Math.random().toString(36).substring(7);

      let adjustedX = posX;
      let adjustedY = posY;

      while (occupiedPositions.has(`${adjustedX},${adjustedY}`)) {
        adjustedX += 160;
        adjustedY += 0;
      }
      occupiedPositions.add(`${adjustedX},${adjustedY}`);

      newNodes.push({
        id: nodeId,
        data: {
          label: step.value.step,
          timeline: step.value.timeline,
          description: step.value.description,
        },
        position: { x: adjustedX, y: adjustedY },
        draggable: true,
      });

      if (parentId) {
        newEdges.push({
          id: `e${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          animated: true,
        });
      }

      if (step.left) {
        const [leftNodes, leftEdges] = generateTree(step.left, nodeId, adjustedX - 200, adjustedY + 100, occupiedPositions);
        newNodes.push(...leftNodes);
        newEdges.push(...leftEdges);
      }

      if (step.right) {
        const [rightNodes, rightEdges] = generateTree(step.right, nodeId, adjustedX + 200, adjustedY + 100, occupiedPositions);
        newNodes.push(...rightNodes);
        newEdges.push(...rightEdges);
      }

      return [newNodes, newEdges];
    };

    const occupiedPositions = new Set<string>();
    const [initialNodes, initialEdges] = generateTree(roadmapData, null, 250, 0, occupiedPositions);
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [roadmapData]);

  const handleNodeClick = async (event: any, node: any) => {
    const nodeData = nodes.find((n) => n.id === node.id)?.data;
    if (nodeData) {
      setFlashcard({
        step: nodeData.label as string,
        timeline: nodeData.timeline as string,
        description: nodeData.description as string,
      });
    }
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: nodeData }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const flashcardsData = await response.json();
      setFlashcards(flashcardsData);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <ReactFlow colorMode="dark" nodes={nodes} edges={edges} onNodeClick={handleNodeClick} className="min-h-screen min-w-[80vw]" fitView>
        <Controls />
        <Background bgColor="black" size={3} />
      </ReactFlow>

      {/* Timeline and Description */}
      {flashcard && (
        <div
          style={{
            padding: '20px',
            marginTop: '20px',
            color: 'white',
            backgroundColor: '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <h3 style={{ fontSize: '1.5rem' }}>{flashcard.step}</h3>
          {flashcard.timeline && <p><strong>Timeline:</strong> {flashcard.timeline}</p>}
          {flashcard.description && <p><strong>Description:</strong> {flashcard.description}</p>}
        </div>
      )}

      {/* Flashcards */}
      {loading && (
        <div className="flex justify-center items-center h-full mt-10">
          <Loader />
        </div>
      )}

      {!loading && flashcard && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">{`Flashcards for ${flashcard?.step}`}</h2>
          {error && (
            <div>
              <BadgeAlert size={44} color="#ddb797" strokeWidth={3} />
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {flashcards.map((flashcard, index) => (
              <Flashcard key={index} front={flashcard.front} back={flashcard.back} />
            ))}
          </div>
        </div>
      )}
      <footer className="flex items-center justify-center p-6 space-x-4">
        <Button
          onClick={() => router.back()}
          className="bg-white hover:bg-gray-300 text-black"
        >
          <ChevronLeft size={30} />
          Go Back
        </Button>
      </footer>
    </div>
  );
};

export default TreeLayout;