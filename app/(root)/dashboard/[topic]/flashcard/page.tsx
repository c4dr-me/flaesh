'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FlashcardDeck from '@/components/FlashcardDeck';
import {motion} from 'framer-motion';

const FlashcardPage: React.FC = () => {
  const { topic } = useParams();
  const [searchTopic, setSearchTopic] = useState<string>('');
  const router = useRouter();
  const [decodedTopic, setDecodedTopic] = useState<string>('');

  useEffect(() => {
    if (topic) {
      setDecodedTopic(decodeURIComponent(topic as string));
    }
  }, [topic]);

  const handleSearch = () => {
    if (searchTopic.trim()) {
      window.location.href = `/dashboard/${encodeURIComponent(searchTopic)}`;
    }
  };

  // if (!decodedTopic) {
  //   console.log(decodedTopic);
  //   return (
  //     <div className="flex min-h-screen bg-black text-white items-center justify-center">
  //       <Card className="w-full max-w-md bg-gray-800  text-white">
  //         <CardHeader className='items-center'>
  //         <BadgeAlert size={44} color="#ddb797" strokeWidth={3} data-tooltip-id="my-tooltip"
  //         data-tooltip-content="Error fetching data"
  //         data-tooltip-place="top" />
  //         <Tooltip id='my-tooltip'/>
  //         </CardHeader>
  //         <CardFooter>
  //           <Button onClick={() => router.push('/dashboard')} className="w-full bg-gray-700 hover:bg-gray-800">
  //           <ChevronLeft size={30} />
  //           Go Back
  //           </Button>
  //         </CardFooter>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col min-h-screen justify-center align-middle bg-transparent text-white">
      <header className="flex items-center justify-center p-6">
        <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Flashcards for{" "}
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-orange-500">
          {decodedTopic}
        </span>
      </motion.h1>
      </header>
      <div className="w-full max-w-lg flex mt-4 items-center space-x-4 m-auto">
        <Input
          value={searchTopic}
          onChange={(e) => setSearchTopic(e.target.value)}
          placeholder="Search for a topic..."
          className="flex-1 bg-black/90 text-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSearch}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Search
        </Button>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[100vw] space-y-4 mt-4">
          <FlashcardDeck topic={decodedTopic} />
        </div>
      </main>
    </div>
  );
};

export default FlashcardPage;