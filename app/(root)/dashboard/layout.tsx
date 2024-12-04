'use client';

import { useEffect, useState, Suspense, use } from 'react';
import SidebarComponent from '@/components/Sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import CardLayout from '@/components/cardLayout';
import TreeLayout from '@/components/TreeLayout';
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
import { Type } from 'lucide-react';



type FlashcardData = {
  id: number;
  front: string;
  back: string;
};

type RoadmapStep = {
  id: number;
  step: string;
  timeline?: string;
  description: string;
  left?: RoadmapStep | null;
  right?: RoadmapStep | null;
};

type RoadmapData = {
  id: number;
  topic: string;
  roadmapData: RoadmapStep;
  description: string;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<{
    id: number;
    name: string;
    type: 'roadmap' | 'flashcard';
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlashcard, setSelectedFlashcard] = useState<FlashcardData[] | null>(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapData[] | null>(null);
  const [cachedFlashcards, setCachedFlashcards] = useState<Record<number, FlashcardData[]>>({});
  const [cachedRoadmaps, setCachedRoadmaps] = useState<Record<number, RoadmapData[]>>({});
 const { toast } = useToast();

  useEffect(() => {
    // if(!isSignedIn) return;
    const fetchSavedItems = async () => {
      setLoading(true);
      try {
        const [roadmapRes, flashcardRes] = await Promise.all([
          fetch('/api/roadmap/get'),
          fetch('/api/flashcard/get'),
        ]);

        if (!roadmapRes.ok || !flashcardRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const roadmaps = await roadmapRes.json();
        const flashcards = await flashcardRes.json();

        const formattedRoadmaps = roadmaps.map((roadmap: any) => ({
          id: roadmap.id,
          name: roadmap.topic,
          type: 'roadmap',
        }));
        const formattedFlashcards = flashcards.map((flashcard: any) => ({
          id: flashcard.id,
          name: flashcard.topic,
          type: 'flashcard',
        }));

        setSavedItems([...formattedRoadmaps, ...formattedFlashcards]);
      } catch (error) {
        console.error('Error fetching saved items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, []);


  const handleEdit = async (id: number, newName: string, type: 'roadmap' | 'flashcard') => {
    console.log('Edit Triggered:', { id, newName, type });
    try {
      let url = '';
      let body = { id, newName };
      if (type === 'flashcard') {
        url = '/api/flashcard/edit';
      } else if (type === 'roadmap') {
        url = '/api/roadmap/edit';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${type}`);
      }
      setSavedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.type === type ? { ...item, name: newName } : item
        )
      );
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };


  const handleDelete = async (id: number, type: 'roadmap' | 'flashcard') => {
    try {
      let url = '';
      if (type === 'flashcard') {
        url = '/api/flashcard/delete';
      } else if (type === 'roadmap') {
        url = '/api/roadmap/delete';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${type}`);
      }
      
        toast({
          title: 'Success',
          description: 'Deleted successfully!',
        });
      
      setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id || item.type !== type));
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };


  const handleItemClick = async (id: number, type: 'roadmap' | 'flashcard') => {

    if (type === 'flashcard') {
      setSelectedRoadmap(null);
      if (cachedFlashcards[id]) {
        setSelectedFlashcard(cachedFlashcards[id]);
        return;
      }

      try {
        const response = await fetch(`/api/flashcard/get?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch flashcard data');
        }
        const data = await response.json();
        console.log('Fetched Flashcard Data:', data);

        setSelectedFlashcard(data.flashcards);
        setCachedFlashcards((prev) => ({ ...prev, [id]: data.flashcards }));

        console.log('Selected Flashcard:', data.flashcards);
      } catch (error) {
        console.error('Error fetching flashcard data:', error);
      }
    }

    if (type === 'roadmap') {
      setSelectedFlashcard(null);
      if (cachedRoadmaps[id]) {
        setSelectedRoadmap(cachedRoadmaps[id]);
        return;
      }

      try {
        const response = await fetch(`/api/roadmap/get?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Roadmap data');
        }
        const data = await response.json();
        console.log('Fetched Roadmap Data:', data);

        setSelectedRoadmap(data.roadmapData);
        setCachedRoadmaps((prev) => ({ ...prev, [id]: data.roadmapData }));

        console.log('Selected Roadmap:', data.roadmapData);
      } catch (error) {
        console.error('Error fetching roadmap data:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden bg-transparent text-white">

        {/* Sidebar */}
        <SidebarComponent
          isSidebarOpen={isSidebarOpen}
          savedItems={savedItems}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onItemClick={handleItemClick}
        />

        <div className="flex flex-col flex-1">
          {/* Sidebar Toggle Button */}
          <SidebarTrigger
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-4 mt-2 ml-2 bg-gray-800 text-white"
          >
            {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          </SidebarTrigger>
          <Toaster />
          {/* Main Content */}
          <Suspense fallback={<></>}>
            <div className="flex-1 p-6 w-full flex items-center justify-center overflow-auto min-h-screen">

              {selectedFlashcard ? (
                <CardLayout flashcards={selectedFlashcard} />
              ) : selectedRoadmap ? (
                <TreeLayout roadmapData={selectedRoadmap} />
              ) : (
                children
              )}
            </div>
          </Suspense>
          <Footer />
        </div>
      </div>

    </div>
  );
}
