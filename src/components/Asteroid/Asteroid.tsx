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
  //Read-only value that persists across renders
  const numAsteroids = useRef(Math.floor(Math.random() * 4) + 6).current;

  const [asteroidVisibility, setAsteroidVisibility] = useState<boolean[]>(
    Array(numAsteroids).fill(false)
  );
  //
  const [fragmentVisibility, setFragmentVisibility] = useState<boolean[]>(
    Array(numAsteroids).fill(false)
  );

  const [asteroidExploded, setAsteroidExploded] = useState<boolean[]>([]);
  const [fragmentEdPts, setFragmentEndPts] = useState<Point[]>([]);

  const onButtonClick = (index: number) => {
    const asteroidElement = asteroidRefs.current[index]?.current;
    if (asteroidElement) {
      const { left, top } = asteroidElement.getBoundingClientRect();
      // Update the location for the specific asteroid to be used by fragments
      setCurrentAsteroidLocation(prevLocations => {
        const updatedLocations = [...prevLocations];
        updatedLocations[index] = { x: left, y: top };
        return updatedLocations;
      });
    }
    // Update the visibility state to hide the clicked asteroid
    setAsteroidVisibility(prevVisibility => {
      const newAsteroidVisibility = [...prevVisibility];
      newAsteroidVisibility[index] = false;
      return newAsteroidVisibility;
    });

    setFragmentVisibility(prevVisibility => {
      const newFragmentVisibility = [...prevVisibility];
      newFragmentVisibility[index] = true;
      return newFragmentVisibility;
    });

    // Update the exploded state to show the fragments
    setAsteroidExploded(prevExploded => {
      const newExploded = [...prevExploded];
      newExploded[index] = true;
      return newExploded;
    });
  };

  const onFragmentAnimationComplete = (index: number) => {
    setFragmentVisibility(prevVisibility => {
      const newFragmentVisibility = [...prevVisibility];
      newFragmentVisibility[index] = false;
      return newFragmentVisibility;
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
  }, [homeRef, numAsteroids]);

  const clickMeLocation = { x: window.innerWidth / 3, y: 100 };

  const FragmentAsteroidComponents = [
    FragmentAsteroid1,
    FragmentAsteroid2,
    FragmentAsteroid3,
    FragmentAsteroid4
  ];

  // Used to store references to the asteroid elements to get their location
  const asteroidRefs = useRef(
    Array(numAsteroids)
      .fill(undefined)
      .map(() => React.createRef<HTMLDivElement>())
  );

  const [currentAsteroidLocation, setCurrentAsteroidLocation] = useState(
    Array(numAsteroids)
      .fill(undefined)
      .map(() => ({ x: 0, y: 0 }))
  );

  const asteroidScales = useRef(
    Array.from({ length: numAsteroids }, () => Math.random() * 0.7 + 0.6)
  ).current;

  return (
    <section className="asteroid-container">
      {asteroidScales.map((scale, index) =>
        asteroidExploded[index] && fragmentVisibility[index] ? (
          <div key={`fragment-${index}`}>
            {FragmentAsteroidComponents.map((FragmentComponent, i) => (
              <motion.div
                key={`fragment-${index}-${i}`}
                className="fragment"
                initial={currentAsteroidLocation[index]}
                // initial={asteroidAnimations[index]?.animate}
                animate={{
                  x: fragmentEdPts[index * 4 + i].x,
                  y: fragmentEdPts[index * 4 + i].y,
                  scale: 0
                }}
                transition={{ duration: 5, ease: [0.1, 0.87, 0.44, 1] }}
                onAnimationComplete={() =>
                  index === i && onFragmentAnimationComplete(index)
                }
                style={{ scale: scale }}
              >
                <FragmentComponent />
              </motion.div>
            ))}
          </div>
        ) : (
          asteroidVisibility[index] && (
            <motion.div
              key={'asteroid' + index}
              className="asteroid"
              onClick={() => onButtonClick(index)}
              initial={asteroidAnimations[index]?.initial}
              animate={
                index === 0
                  ? clickMeLocation
                  : asteroidAnimations[index]?.animate
              }
              transition={asteroidAnimations[index]?.transition}
              ref={asteroidRefs.current[index]}
              style={{ scale: index === 0 ? 1 : scale }}
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
