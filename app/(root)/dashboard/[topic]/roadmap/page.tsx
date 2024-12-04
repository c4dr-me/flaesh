'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RoadmapTree from '@/components/RoadmapTree';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const { topic } = useParams();
  const [decodedTopic, setDecodedTopic] = useState<string>('');
  const [searchTopic, setSearchTopic] = useState<string>('');

  useEffect(() => {
    if (topic) {
      setDecodedTopic(decodeURIComponent(topic));
    }
  }, [topic]);

  const handleSearch = () => {
    if (searchTopic.trim()) {
      window.location.href = `/dashboard/${encodeURIComponent(searchTopic)}`;
    }
  };

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col items-center justify-start p-6 space-y-6 overflow-hidden">
      <header>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Roadmap for{" "}
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-orange-500">
            {decodedTopic}
          </span>
        </motion.h1>
      </header>

      <div className="w-full max-w-lg flex items-center space-x-4 mx-4">
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

      {/* Roadmap Tree */}
      <main className="w-full flex-1 overflow-hidden">
        <RoadmapTree topic={decodedTopic} />
      </main>
    </div>
  );
}