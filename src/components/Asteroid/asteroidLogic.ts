import React from 'react';
import { Point, animationProps } from './Asteroid';

//prettier-ignore
type AsteroidProps = {
  numAsteroids: number;
    contentPaddingLeft: number;
    contentPaddingRight: number;
    contentWidth: number;
    setAsteroidVisibility: React.Dispatch<React.SetStateAction<boolean[]>>;
    setAsteroidAnimations: React.Dispatch<React.SetStateAction<animationProps[]>>;
    setFragmentEndPts: React.Dispatch<React.SetStateAction<Point[]>>;
};

export default function asteroidLogic({
  numAsteroids,
  contentPaddingLeft,
  contentPaddingRight,
  setAsteroidVisibility,
  setAsteroidAnimations,
  setFragmentEndPts
}: AsteroidProps) {
  setAsteroidVisibility(Array(numAsteroids).fill(true));

  const generateStartPT = () => {
    // Randomly decide whether to place the point offscreen to the left or the bottom
    const isLeft = Math.random() > 0.5;

    let x, y;

    if (isLeft) {
      // Place the point offscreen to the left
      x = -Math.random() * 100 - 10; // Offscreen to the left
      y = Math.random() * window.innerHeight; // Anywhere from top to bottom
    } else {
      // Place the point offscreen at the bottom
      y = window.innerHeight + Math.random() * 100 + 10; // Offscreen at the bottom
      x = Math.random() * window.innerWidth; // Anywhere from left to right
    }

    return { x, y };
  };

  //Endpt x: 0 < x < left padding || left padding + contentWidth < x < window.innerWidth
  //Endpt y: 0 < y < window.innerHeight
  let generatedCount = 0;
  const generateEndPT = () => {
    const contentRight = window.innerWidth - contentPaddingRight;

    //Let side of content
    if (generatedCount < 3) {
      generatedCount++;
      return {
        x: Math.max(Math.random() * (contentPaddingLeft - 100), 50),
        y: Math.max(Math.random() * (window.innerHeight - 100), 100),
        rotate: Math.random() * 360
      };
    }

    //Right side of content top
    if (generatedCount < 5) {
      generatedCount++;
      return {
        x: Math.min(
          contentRight - 125 + Math.random() * (contentPaddingRight + 75),
          window.innerWidth - 20
        ),
        y: Math.min(
          10 + Math.random() * (window.innerHeight / 3 + 100),
          window.innerHeight / 3
        ),
        rotate: Math.random() * 360
      };
    } else {
      generatedCount++;
      return {
        x: Math.min(
          100 + Math.random() * window.innerWidth,
          window.innerWidth - 100
        ),
        y: Math.min(
          window.innerHeight * 0.75 +
            Math.random() * (window.innerHeight * 0.25),
          window.innerHeight - 35
        ),
        rotate: Math.random() * 360
      };
    }
  };

  const calculateDistance = (startPT: Point, endPT: Point) => {
    return Math.sqrt(
      Math.pow(endPT.x - startPT.x, 2) + Math.pow(endPT.y - startPT.y, 2)
    );
  };

  const generateAnimationProps = () => {
    const startPT = generateStartPT();
    const endPT = generateEndPT();
    const distance = calculateDistance(startPT, endPT);

    const speed = 200; // pixels per second
    const duration = distance / speed; // seconds

    return {
      initial: startPT,
      animate: endPT,
      transition: { duration: duration, ease: [0.1, 0.87, 0.44, 1] }
    };
  };

  // Generate animations for each asteroid
  const newAnimations = Array.from({ length: numAsteroids }, () =>
    generateAnimationProps()
  );

  setAsteroidAnimations(newAnimations);

  const generateFragmentEndPT = () => {
    const endPT = {
      x: (Math.random() * 2 - 1) * window.innerWidth,
      y: (Math.random() * 2 - 1) * window.innerHeight
    };
    return endPT;
  };

  // Generate animations for each fragment
  const newFragments = Array.from({ length: numAsteroids * 4 }, () =>
    generateFragmentEndPT()
  );
  setFragmentEndPts(newFragments);
}
