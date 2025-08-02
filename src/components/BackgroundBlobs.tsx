import React, { useState, useEffect } from 'react';

// Define a type for the style of each blob for type safety
interface BlobStyle {
  top: string;
  left: string;
  width: string;
  height: string;
  animationDelay: string;
}

const BackgroundBlobs = () => {
  const [blobStyles, setBlobStyles] = useState<BlobStyle[]>([]);

  useEffect(() => {
    const generateRandomStyle = (index: number): BlobStyle => {
      // Generate random positions and sizes for variety
      const size = Math.floor(Math.random() * 350) + 150; // Size between 150px and 500px
      const top = Math.random() * 80; // Position from 0% to 80% from the top
      const left = Math.random() * 80; // Position from 0% to 80% from the left

      return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        // Stagger the animations so they don't all move in sync
        animationDelay: `${index * 1.5}s`,
      };
    };

    // Create styles for 3 blobs
    const newStyles = Array.from({ length: 3 }, (_, i) => generateRandomStyle(i));
    setBlobStyles(newStyles);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Define the colors for the blobs. They will respect your Tailwind dark/light mode settings.
  // Make sure these colors (primary, secondary, accent) are defined in your tailwind.config.js
  const blobColors = [
    'bg-primary/15 dark:bg-primary/40',
    'bg-secondary/15 dark:bg-secondary/40',
    'bg-accent/15 dark:bg-accent/40',
  ];

  return (
    <>
      {blobStyles.map((style, index) => (
        <div
          key={index}
          className={`blob-animation absolute rounded-full opacity-70 blur-2xl -z-10 ${blobColors[index % blobColors.length]}`}
          style={style}
        />
      ))}
    </>
  );
};

export default BackgroundBlobs;