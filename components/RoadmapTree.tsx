import React, { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { ReactFlow, Controls, Background, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Flashcard from "./Flashcard";
import { BadgeAlert, Save, ChevronLeft } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Loader from "./loader";
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";

interface FlashcardProps {
  front: string;
  back: string;
}

const RoadmapTree: React.FC<{ topic: string }> = ({ topic }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [flashcards, setFlashcards] = useState<FlashcardProps[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const flashcardCache = useRef<{ [key: string]: FlashcardProps[] }>({});
  const { isSignedIn, user } = useUser();
  const roadmapDataRef = useRef<any>(null); 
  const [timeline, setTimeline] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const {toast} = useToast();

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        const response = await fetch("/api/generate/roadmap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: topic }),
        });

        if (!response.ok) {
          toast({
            variant: "destructive",
            title: `Error ${response.status}`,
            description: 'Error generating roadmap!',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Roadmap generated successfully!',
          });
        }

        const roadmapData = await response.json();

        if (!roadmapData || !roadmapData.value) {
          throw new Error("Invalid roadmap data");
        }

        roadmapDataRef.current = roadmapData; 
        const occupiedPositions = new Set<string>(); 
        const [initialNodes, initialEdges] = generateTree(
          roadmapData,
          null,
          250,
          0,
          occupiedPositions
        );
        setNodes(initialNodes);
        setEdges(initialEdges);
      } catch (error) {
        console.error("Error fetching roadmap data:", error);
      }
    };

    fetchRoadmapData();
  }, [topic]);

  const generateTree = (
    step: any,
    parentId: string | null,
    posX: number,
    posY: number,
    occupiedPositions: Set<string>
  ): [Node[], Edge[]] => {
    if (!step || !step.value) {
      throw new Error("Invalid step data");
    }

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    let adjustedX = posX;
    let adjustedY = posY;
    while (occupiedPositions.has(`${adjustedX},${adjustedY}`)) {
      adjustedX += 160;
      adjustedY += 0;
    }

    occupiedPositions.add(`${adjustedX},${adjustedY}`);

    const nodeId = Math.random().toString(36).substring(7); 
    newNodes.push({
      id: nodeId,
      data: {
        label: step.value.step,
        timeline: step.value.timeline, 
        description: step.value.description,
      },
      position: { x: adjustedX, y: adjustedY },
      dragging: true,
      draggable: true,
    });

    if (parentId) {
      newEdges.push({
        id: `e${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        animated: true,
        style: { stroke: "#fff", strokeWidth: 1 },
      });
    }

    if (step.left) {
      const [leftNodes, leftEdges] = generateTree(
        step.left,
        nodeId,
        adjustedX - 200,
        adjustedY + 100,
        occupiedPositions
      );
      newNodes.push(...leftNodes);
      newEdges.push(...leftEdges);
    }

    if (step.right) {
      const [rightNodes, rightEdges] = generateTree(
        step.right,
        nodeId,
        adjustedX + 200,
        adjustedY + 100,
        occupiedPositions
      );
      newNodes.push(...rightNodes);
      newEdges.push(...rightEdges);
    }

    return [newNodes, newEdges];
  };

  const handleNodeClick = useCallback(
    async (event: React.MouseEvent, node: Node) => {
      const topic = node.data.label;
      setSelectedTopic(topic);
      setTimeline(node.data.timeline || null);
      setDescription(node.data.description || null);
      setSelectedTopic(topic);

      if (flashcardCache.current[topic]) {
        console.log("Using cached flashcards for topic:", topic);
        setFlashcards(flashcardCache.current[topic]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: topic }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Flashcards generated successfully!',
          });
        }

        const flashcardsData = await response.json();
        console.log("Fetched flashcards data:", flashcardsData);
        flashcardCache.current[topic] = flashcardsData;
        setFlashcards(flashcardsData);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setError("Failed to fetch flashcards. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const saveRoadmap = async (
    userId: string,
    topic: string,
    roadmapData: any
  ) => {
    try {
      const response = await fetch("/api/roadmap/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, topic, roadmapData }),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: `Error ${response.status}`,
          description: 'Flashcards not saved!',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Roadmap saved successfully!',
        });
      }
    } catch (error) {
      console.error("Error saving roadmap:", error.message);
    }
  };

  const handleSave = () => {
    if (isSignedIn && user) {
      const userId = user.id;
      if (userId && topic) {
        saveRoadmap(userId, topic, roadmapDataRef.current);
      }
    } else {
      console.log("User is not signed in");
    }
  };

  return (
    <div className="w-full min-h-screen" >
      <Suspense fallback={<Loader />}>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        fitView
        className="min-h-screen"
      >
        <Controls />
        <Background bgColor="black" size={3} />
        </ReactFlow>
      </Suspense>
      <div className="mt-10 space-x-4 flex flex-row item-center justify-center">
        <button
          onClick={() =>
            (window.location.href = `/dashboard/${encodeURIComponent(topic)}`)
          }
          className="bg-white hover:bg-gray-300 text-black px-4 py-2 border-white border-2 rounded flex flex-row items-center justify-between shadow-lg transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]"
        >
          <ChevronLeft size={30} />
          Go Back
        </button>
        <button
          onClick={handleSave}
          className="bg-white hover:bg-gray-300 text-black px-4 py-2 border-white border-2 rounded flex flex-row items-center justify-between shadow-lg transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]"
        >
          <Save size={30} className="pr-2" />
          Save
        </button>
      </div>
      {loading && (
        <Loader/>
      )}
      {!loading && selectedTopic && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-4">{`Flashcards for ${selectedTopic}`}</h2>
          {error && (
            <div>
              <BadgeAlert size={44} color="#ddb797" strokeWidth={3} />
            </div>
          )}

          <div
            style={{
              padding: "20px",
              marginTop: "20px",
              color: "white",
              backgroundColor: "#333",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="mb-5"
          >
            {timeline && (
              <p>
                <strong>Timeline:</strong> {timeline}
              </p>
            )}
            {description && (
              <p>
                <strong>Description:</strong> {description}
              </p>
            )}
          </div>
          <Toaster />
          {/* Flashcards */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {flashcards.map((flashcard, index) => (
              <Flashcard
                key={index}
                front={flashcard.front}
                back={flashcard.back}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapTree;
