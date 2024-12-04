'use client';
import { useEffect, useState } from 'react';
import Flashcard from './Flashcard';
import {BadgeAlert, Save, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import Loader from './loader';
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";

interface FlashcardData {
  front: string;
  back: string;
}

const FlashcardDeck: React.FC<{ topic: string }> = ({ topic }) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: topic }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Flashcards generated successfully!',
          });
        }

        const data = await response.json();
        if (data && Array.isArray(data)) {
          setFlashcards(data);
        } else {
          throw new Error('Invalid flashcards data');
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [topic]);

  const saveFlashcards = async (userId: string, topic: string, flashcards: any) => {
    try {
      const response = await fetch('/api/flashcard/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, topic, flashcards }),
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
        console.log('Flashcards saved successfully!');
        toast({
          title: 'Success',
          description: 'Flashcards saved successfully!',
        });
      }
    } catch (error) {
      console.error('Error saving flashcards', error.message);
    }
  };

  const handleSave = () => {
    if (isSignedIn && user) {
      const userId = user.id;
      if (userId && topic) {
        saveFlashcards(userId, topic, flashcards);
      }
    } else {
      console.log('User is not signed in');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className='flex justify-center m-auto item-center'><BadgeAlert size={44} color="#ddb797" strokeWidth={3} /></div>;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {flashcards.map((flashcard, index) => (
          <Flashcard key={index} front={flashcard.front} back={flashcard.back} />
        ))}
      </div>
      <Toaster />
      <footer className="flex items-center justify-center p-6 space-x-4">
        <Button
          onClick={() => router.back()}
          className="bg-white hover:bg-gray-300 text-black px-4 py-2 border-white border-2 rounded flex flex-row items-center justify-between shadow-lg transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]"
        >
          <ChevronLeft size={30} />
          Go Back
        </Button>
        <Button
          onClick={handleSave}
          className="bg-white hover:bg-gray-300 text-black px-4 py-2 border-white border-2 rounded flex flex-row items-center justify-between shadow-lg transition duration-300 ease-in-out hover:bg-transparent hover:text-white hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]"
        >
          <Save size={30} /> Save
        </Button>
      </footer>
    </>
  );
};

export default FlashcardDeck;
