import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-80 m-4 [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div
          className="absolute w-full h-full bg-gradient-to-br from-transparent via-black to-[rgba(241,144,54,0.1)] text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center backdrop-blur-xl border border-orange-500/30"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <CardContent className="mt-2">
            <p className="text-md font-bold italic text-center">{front}</p>
          </CardContent>
        </div>
        <div
          className="absolute w-full h-full bg-gradient-to-tr from-[rgba(239,219,39,0.1)] via-transparent to-black text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center backdrop-blur-xl border border-yellow-700/80"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardContent className="mt-4 space-y-4 overflow-auto">
            <p className="text-md text-center break-words text-gray-200 font-bold">{back}</p>
          </CardContent>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Flashcard;
