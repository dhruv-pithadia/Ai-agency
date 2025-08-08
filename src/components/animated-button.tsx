"use client";
import { motion } from 'framer-motion';

interface GlowingButtonProps {
  text: string;
  href: string;
}

export default function GlowingButton({ text, href }: GlowingButtonProps) {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      whileHover="hover"
    >
      {/* Animated Pulsing Glow - Only visible on hover */}
      <motion.div
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur"
        style={{ zIndex: 0 }}
        initial={{ opacity: 0, scale: 1 }}
        variants={{
          hover: {
            opacity: 0.75,
            scale: 1.01,
          },
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      />
      {/* Main button */}
      <motion.a
        href={href}
        className="relative flex items-center justify-center group w-full text-center bg-primary text-white rounded-full cursor-pointer text-sm leading-5 px-5 py-3 z-10"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
      >
        <span className="relative text-base z-10 font-nunito">{text}</span>
      </motion.a>
    </motion.div>
  );
}
