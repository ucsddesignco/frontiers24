import React from 'react';
import { Point } from './Asteroid';

//prettier-ignore
type AsteroidProps = {
    homeElement: HTMLElement;
    contentPaddingLeft: number;
    contentWidth: number;
    setContentInfo: React.Dispatch<React.SetStateAction<{paddingLeft: number; width: number;}>>;
    setNumAsteroids: React.Dispatch<React.SetStateAction<number>>;
    setAsteroidVisibility: React.Dispatch<React.SetStateAction<boolean[]>>;
    setAsteroidAnimations: React.Dispatch<React.SetStateAction<{initial: Point; animate: Point; transition: {duration: number; ease: number[]}}[]>>;
    setFragmentEndPts: React.Dispatch<React.SetStateAction<Point[]>>;
};

export default function asteroidLogic({
  homeElement,
  setContentInfo,
  setNumAsteroids,
  contentPaddingLeft,
  contentWidth,
  setAsteroidVisibility,
  setAsteroidAnimations,
  setFragmentEndPts
}: AsteroidProps) {
  const style = window.getComputedStyle(homeElement);
  const paddingLeftValue = style.paddingLeft;
  setContentInfo({
    paddingLeft: parseFloat(paddingLeftValue),
    width: homeElement.getBoundingClientRect().width
  });

  const numAsteroids = 5;
  setNumAsteroids(numAsteroids);

  setAsteroidVisibility(Array(numAsteroids).fill(true));

  //Startpt x: -window.innerWidth < x < 0
  //Startpt y: 0 < y < window.innerHeight
  const generateStartPT = () => {
    const startPT = {
      x: -((Math.random() * window.innerWidth) / 4),
      y: Math.random() * window.innerHeight
    };
    return startPT;
  };

  //Endpt x: 0 < x < left padding || left padding + contentWidth < x < window.innerWidth
  //Endpt y: 0 < y < window.innerHeight
  const generateEndPT = () => {
    const contentMidPoint = contentPaddingLeft + contentWidth / 2;

    let endX = Math.random() * window.innerWidth;

    if (endX < contentMidPoint) {
      endX = Math.min(contentPaddingLeft - Math.random() * 100, endX);
    }

    if (endX > contentMidPoint) {
      endX = Math.max(contentWidth - 500 - Math.random() * 100, endX);
    }

    const endPT = {
      x: endX,
      y: Math.random() * (window.innerHeight - 100)
    };
    return endPT;
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
