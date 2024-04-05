import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useState } from 'react';

import './Asteroid.scss';
import LargeAsteroid2 from './Large-Asteroid-2';
import FragmentAsteroid1 from './Fragment-Asteroid-1';
import FragmentAsteroid2 from './Fragment-Asteroid-2';
import FragmentAsteroid3 from './Fragment-Asteroid-3';
import FragmentAsteroid4 from './Fragment-Asteroid-4';

type AsteroidProps = {
  homeRef: React.RefObject<HTMLElement>;
};

export default function Asteroid({ homeRef }: AsteroidProps) {
  const [numAsteroids, setNumAsteroids] = useState(0);
  const [contentInfo, setContentInfo] = useState({ paddingLeft: 0, width: 0 });
  const [asteroidAnimations, setAsteroidAnimations] = useState<
    animationProps[]
  >([]); // [ {x: number, y: number}
  const [asteroidVisibility, setAsteroidVisibility] = useState<boolean[]>([]);
  const [fragmentVisibility, setFragmentVisibility] = useState<boolean[]>([]); // [ {x: number, y: number}
  const [asteroidExploded, setAsteroidExploded] = useState<boolean[]>([]);
  const [fragmentEdPts, setFragmentEndPts] = useState<Point[]>([]);
  const [asteroidRotations, setAsteroidRotations] = useState<number[]>([]);

  type animationProps = {
    initial: Point;
    animate: Point;
    transition: { duration: number; ease: number[] };
  };

  type Point = {
    x: number;
    y: number;
  };

  const onButtonClick = (index: number) => {
    console.log(index);
    console.log(fragmentEdPts);

    // Update the visibility state to hide the clicked asteroid
    setAsteroidVisibility(prevVisibility => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = false;
      return newVisibility;
    });

    setFragmentVisibility(Array(numAsteroids).fill(true));

    // Update the exploded state to show the fragments
    setAsteroidExploded(prevExploded => {
      const newExploded = [...prevExploded];
      newExploded[index] = true;
      return newExploded;
    });
  };

  const onFragmentAnimationComplete = (index: number) => {
    setFragmentVisibility(prevVisibility => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = false;
      return newVisibility;
    });
  };

  useEffect(() => {
    const homeElement = homeRef.current;
    if (homeElement) {
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
        const contentPaddingLeft = contentInfo.paddingLeft;
        const contentWidth = contentInfo.width;
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
  }, [homeRef, contentInfo.paddingLeft, contentInfo.width]);

  // Initialize asteroid rotation values
  useEffect(() => {
    const rotations = Array.from(
      { length: numAsteroids },
      () => Math.random() * 360
    );
    setAsteroidRotations(rotations);
  }, [numAsteroids]);

  return (
    <section className="asteroid-container">
      {Array.from({ length: numAsteroids }, (_, index) =>
        asteroidExploded[index] && fragmentVisibility[index] ? (
          <>
            <motion.div
              className="fragment"
              initial={
                index === 0
                  ? { x: 1200, y: 100 }
                  : asteroidAnimations[index]?.animate
              }
              animate={{
                x: fragmentEdPts[index * 4 + 0].x,
                y: fragmentEdPts[index * 4 + 0].y,
                scale: 0
              }}
              transition={{ duration: 10, ease: [0.1, 0.87, 0.44, 1] }}
              onAnimationComplete={() => {
                onFragmentAnimationComplete(index);
              }}
            >
              <FragmentAsteroid1 />
            </motion.div>
            <motion.div
              className="fragment"
              initial={
                index === 0
                  ? { x: 1200, y: 100 }
                  : asteroidAnimations[index]?.animate
              }
              animate={{
                x: fragmentEdPts[index * 4 + 1].x,
                y: fragmentEdPts[index * 4 + 1].y,
                scale: 0
              }}
              transition={{ duration: 10, ease: [0.1, 0.87, 0.44, 1] }}
            >
              <FragmentAsteroid2 />
            </motion.div>

            <motion.div
              className="fragment"
              initial={
                index === 0
                  ? { x: 1200, y: 100 }
                  : asteroidAnimations[index]?.animate
              }
              animate={{
                x: fragmentEdPts[index * 4 + 2].x,
                y: fragmentEdPts[index * 4 + 2].y,
                scale: 0
              }}
              transition={{ duration: 10, ease: [0.1, 0.87, 0.44, 1] }}
            >
              <FragmentAsteroid3 />
            </motion.div>

            <motion.div
              className="fragment"
              initial={
                index === 0
                  ? { x: 1200, y: 100 }
                  : asteroidAnimations[index]?.animate
              }
              animate={{
                x: fragmentEdPts[index * 4 + 3].x,
                y: fragmentEdPts[index * 4 + 3].y,
                scale: 0
              }}
              transition={{ duration: 10, ease: [0.1, 0.87, 0.44, 1] }}
            >
              <FragmentAsteroid4 />
            </motion.div>
          </>
        ) : (
          asteroidVisibility[index] && (
            <motion.div
              key={index}
              className="asteroid"
              onClick={() => onButtonClick(index)}
              initial={asteroidAnimations[index]?.initial}
              animate={
                index === 0
                  ? { x: 1200, y: 100 }
                  : asteroidAnimations[index]?.animate
              }
              transition={asteroidAnimations[index]?.transition}
              style={
                index === 0 ? {} : { rotate: `${asteroidRotations[index]}deg` }
              }
            >
              <LargeAsteroid2 />
              {index === 0 && <h4 className="asteroid-signifier">Click Me</h4>}
            </motion.div>
          )
        )
      )}
    </section>
  );
}
