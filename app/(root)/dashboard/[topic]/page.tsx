"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion"; 

export default function TopicPage() {
  const { topic } = useParams();
  const [decodedTopic, setDecodedTopic] = useState<string>("");

  useEffect(() => {
    if (topic) {
      setDecodedTopic(decodeURIComponent(topic));
    }
  }, [topic]);

  return (
    <div className="min-h-screen min-w-screen bg-transparent text-white flex flex-col items-center justify-center space-y-6 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore the topic{" "}
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-orange-500">
          {decodedTopic}
        </span>
      </motion.h1>

      <p className="text-lg md:text-xl font-light text-center max-w-2xl px-4">
        Dive deeper into your learning with personalized flashcards and
        interactive roadmaps for the topic {decodedTopic}.
      </p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-x-6 md:space-y-0 justify-center">
        <button
          onClick={() =>
            (window.location.href = `/dashboard/${encodeURIComponent(
              decodedTopic
            )}/flashcard`)
          }
          className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]  transition duration-300 font-bold tracking-wide"
        >
          Flashcards
        </button>

        <button
          onClick={() =>
            (window.location.href = `/dashboard/${encodeURIComponent(
              decodedTopic
            )}/roadmap`)
          }
          className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]  transition duration-300 font-bold tracking-wide"
        >
          Roadmap
        </button>
      </div>
    </div>
  );
}
