'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full py-10 border-t border-gray-700 bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-24">
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
           <motion.div
          className="text-2xl font-bold flex flex-row justify-center items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
           
              <Image src="/logo_name.png" width={100} height={30} alt="Logo" />
            
          </Link>
        </motion.div>
          <p className="mt-4 text-lg text-gray-400 text-center md:text-left">
            Revolutionize the way you learn with AI-generated flashcards and roadmaps.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="flex flex-col items-center md:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-lg text-gray-400 text-center md:text-left">
            <li>
              <Link href="/#about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/#features" className="hover:text-white transition">
                Features
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Us */}
        <motion.div
          className="flex flex-col items-center md:items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-2 text-lg text-gray-400 text-center md:text-left">
            <li>
              Email:{" "}
              <a href="mailto:support@flaesh.com" className="hover:text-white transition">
                jayant_cse_26@msit.in
              </a>
            </li>
            <li>Phone: +1-234-567-890</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-lg text-white px-6">
        &copy; {new Date().getFullYear()} Flaesh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;