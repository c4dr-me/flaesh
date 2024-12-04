import Flashcard from './Flashcard';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CardLayout = ({ flashcards }) => {
  const router = useRouter();
console.log(flashcards);
  if (!flashcards) return <p>Loading...</p>;

  if (flashcards.length === 0) {
    return <p>No flashcards available.</p>;
  }

  return (
    <div className='flex flex-col'>
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} front={flashcard.front} back={flashcard.back} />
      ))}
    </div>
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

export default CardLayout;
