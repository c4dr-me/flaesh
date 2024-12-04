'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, WandSparkles, BookOpen, Map, Users } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const featureData = [
  {
    title: "AI-Generated Flashcards",
    description:
      "Save time and enhance learning with AI-powered flashcards tailored to your needs.",
    icon: <BookOpen size={32} color="#EB5B00" />,
  },
  {
    title: "Interactive Roadmaps",
    description:
      "Visualize and plan your learning journey with engaging roadmaps created by AI.",
    icon: <Map size={32} color="#EB5B00" />,
  },
  {
    title: "Accessibility",
    description:
      "Easily create and save flashcards and roadmaps with a user-friendly interface and dashboard.",
    icon: <Users size={32} color="#EB5B00" />,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full mb-20 text-white">
      {/* Header Section */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.h1
            className="text-7xl font-bold text-white text-transparent bg-clip-text"
            variants={fadeInUp}
          >
            Welcome to{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                background: "linear-gradient(90deg, #c21500, #F27121, #f83600)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                animation: "gradientAnimation 3s ease-in-out infinite",
              }}
            >
              Flaesh.
            </span>
          </motion.h1>
          <motion.p className="mt-4 text-xl text-gray-300" variants={fadeInUp}>
            Create and learn with AI-generated flashcards and Roadmaps!
          </motion.p>

          <motion.div className="mt-6 flex space-x-4" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/sign-in"
                className="px-4 py-2 bg-black text-white rounded border-2 border-solid border-white flex items-center space-x-2 hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]"
              >
                <span>Sign In</span>
                <LogIn size={18} />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-black text-white rounded border-2 border-solid border-white flex items-center space-x-2 hover:shadow-[5px_5px_0px_0px_rgb(255,255,255)]"
              >
                <span>Try out yourself</span>
                <WandSparkles size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-12" id="features">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-10"
        >
          <motion.h2
            className="text-4xl font-bold text-white"
            variants={fadeInUp}
          >
            Features
          </motion.h2>
        
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center"
        >
          {featureData.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-transparent h-60 m-4 flex flex-col justify-evenly place-items-start backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg p-6 shadow-lg"
              style={{
                background: "rgba(157, 70, 18, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(235,101,101,0.3)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-400 mt-2 text-left">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
