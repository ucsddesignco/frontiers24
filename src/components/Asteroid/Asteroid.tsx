import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

import './Asteroid.scss';
import LargeAsteroid2 from './Large-Asteroid-2';
import FragmentAsteroid1 from './Fragments/Fragment-Asteroid-1';
import FragmentAsteroid2 from './Fragments/Fragment-Asteroid-2';
import FragmentAsteroid3 from './Fragments/Fragment-Asteroid-3';
import FragmentAsteroid4 from './Fragments/Fragment-Asteroid-4';
import asteroidLogic from './asteroidLogic';

type AsteroidProps = {
  homeRef: React.RefObject<HTMLElement>;
};

type animationProps = {
  initial: Point;
  animate: Point;
  transition: { duration: number; ease: number[] };
};

export type Point = {
  x: number;
  y: number;
};

export default function Asteroid({ homeRef }: AsteroidProps) {
  const [asteroidAnimations, setAsteroidAnimations] = useState<
    animationProps[]
  >([]); // [ {x: number, y: number}
  const [asteroidVisibility, setAsteroidVisibility] = useState<boolean[]>([]);
  const [fragmentVisibility, setFragmentVisibility] = useState<boolean[]>([]); // [ {x: number, y: number}
  const [asteroidExploded, setAsteroidExploded] = useState<boolean[]>([]);
  const [fragmentEdPts, setFragmentEndPts] = useState<Point[]>([]);
  const numAsteroids = 7;

  const onButtonClick = (index: number) => {
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
      asteroidLogic({
        numAsteroids,
        contentPaddingLeft: parseInt(style.paddingLeft),
        contentPaddingRight: parseInt(style.paddingRight),
        contentWidth: parseInt(style.width),
        setAsteroidVisibility,
        setAsteroidAnimations,
        setFragmentEndPts
      });
    }
  }, [homeRef]);

  const clickMeLocation = { x: window.innerWidth / 3, y: 100 };

  const FragmentAsteroidComponents = [
    FragmentAsteroid1,
    FragmentAsteroid2,
    FragmentAsteroid3,
    FragmentAsteroid4
  ];

  const asteroidRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    asteroidRefs.current = asteroidRefs.current.slice(0, numAsteroids);
  }, []);

  return (
    <section className="asteroid-container">
      {Array.from({ length: numAsteroids }, (_, index) =>
        asteroidExploded[index] && fragmentVisibility[index] ? (
          <>
            {FragmentAsteroidComponents.map((FragmentComponent, i) => (
              <motion.div
                key={i}
                className="fragment"
                initial={
                  index === 0
                    ? clickMeLocation
                    : asteroidAnimations[index]?.animate
                }
                animate={{
                  x: fragmentEdPts[index * 4 + i].x,
                  y: fragmentEdPts[index * 4 + i].y,
                  scale: 0
                }}
                transition={{ duration: 5, ease: [0.1, 0.87, 0.44, 1] }}
                onAnimationComplete={() =>
                  index === i && onFragmentAnimationComplete(index)
                }
              >
                <FragmentComponent />
              </motion.div>
            ))}
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
                  ? clickMeLocation
                  : asteroidAnimations[index]?.animate
              }
              transition={asteroidAnimations[index]?.transition}
            >
              <LargeAsteroid2 />
              {index === 0 && (
                <p
                  style={{ textWrap: 'nowrap' }}
                  className="asteroid-signifier"
                >
                  Click Me !
                </p>
              )}
            </motion.div>
          )
        )
      )}
    </section>
  );
}
