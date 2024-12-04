'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full  text-white p-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
               <motion.div
          className="text-2xl font-bold flex flex-row justify-center items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
           
              <Image src="/logo_name.png" width={90} height={30} alt="Logo" style={{ width:'auto', height: 'auto' }}/>
            
          </Link>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
             <Link href="/sign-up"
              className="px-4 py-2 bg-black text-white rounded border-2 border-solid border-white hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-lg hover:bg-gradient-to-r hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 transition duration-300 hover:border-orange-500 hover:shadow-[5px_5px_0px_0px_rgb(249,119,22)]">
                Sign Up
            
            </Link>
           
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/sign-in" className="px-4 mr-2 py-2 text-white rounded border-2 border-solid border-white bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 transition duration-300 hover:border-orange-500 hover:shadow-[5px_5px_0px_0px_rgb(249,119,22)]">
              Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;