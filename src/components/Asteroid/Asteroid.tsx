import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useState } from 'react';

import './Asteroid.scss';
import LargeAsteroid2 from './Large-Asteroid-2';

type AsteroidProps = {
  homeRef: React.RefObject<HTMLElement>;
}

export default function Asteroid({homeRef}: AsteroidProps) {

  const [numAsteroids, setNumAsteroids] = useState(0);
  const [contentInfo, setContentInfo] = useState({paddingLeft: 0,  width: 0});
  const [asteroidAnimations, setAsteroidAnimations] = useState<animationProps[]>([]); // [ {x: number, y: number}
  const [asteroidVisibility, setAsteroidVisibility] = useState<boolean[]>([]);

  type animationProps = {
    initial: Point;
    animate: Point;
    transition: {duration: number, ease: number[]}
  }

  type Point = {
        x: number;
        y: number;
   };

  //Startpt x: -window.innerWidth < x < 0
  //Startpt y: 0 < y < window.innerHeight
  const generateStartPT = () => {
    const startPT = { x: -(Math.random() * window.innerWidth/4), y: Math.random() * window.innerHeight}
    return startPT
  }


  //Endpt x: 0 < x < left padding || left padding + contentWidth < x < window.innerWidth
  //Endpt y: 0 < y < window.innerHeight
  const generateEndPT = () => {
    const contentPaddingLeft = contentInfo.paddingLeft;
    const contentWidth = contentInfo.width;
    const contentMidPoint = contentPaddingLeft + contentWidth/2;

    let endX = Math.random() * window.innerWidth;

    if(endX < contentMidPoint) { 
      endX = Math.min(contentPaddingLeft - (Math.random() * 100), endX)
    }

    if(endX > contentMidPoint) {
        endX = Math.max(contentWidth - 500 - (Math.random() * 100), endX)
    }

    const endPT = {x: endX, 
                  y: Math.random() * (window.innerHeight - 100)
    };
    return endPT;
  }

  const calculateDistance = (startPT: Point, endPT: Point) => {
    return Math.sqrt(Math.pow(endPT.x - startPT.x, 2) + Math.pow(endPT.y - startPT.y, 2));
  }

  const generateAnimationProps = () => {
    const startPT = generateStartPT();
    const endPT = generateEndPT();
    const distance = calculateDistance(startPT, endPT);

    const speed = 200; // pixels per second
    const duration = distance / speed; // seconds

    return {
      initial: startPT,
      animate: endPT,
      transition: {duration: duration, ease: [0.1, 0.87, 0.44, 1] },
    }
  }

  const onButtonClick = (index : number) => {
    console.log('button clicked');
    console.log(index);

    // Update the visibility state to hide the clicked asteroid
    setAsteroidVisibility(prevVisibility => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = false;
      return newVisibility;
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const homeElement = homeRef.current;
    if (homeElement) {
      const style = window.getComputedStyle(homeElement);
      const paddingLeftValue = style.paddingLeft;
      setContentInfo({paddingLeft: parseFloat(paddingLeftValue), width: homeElement.getBoundingClientRect().width});
      
      const numAsteroids = 5;
      setNumAsteroids(numAsteroids);

      setAsteroidVisibility(Array(numAsteroids).fill(true));

      // Generate animations for each asteroid
      const newAnimations = Array.from({ length: numAsteroids }, () => generateAnimationProps());
      setAsteroidAnimations(newAnimations);
    }
  }, [])
    
  return (
    <section className='asteroid-container'>
      {Array.from({ length: numAsteroids }, (_, index) => (
        asteroidVisibility[index] && (
          <motion.div 
            key={index}
            className='asteroid'
            onClick={() => onButtonClick(index)}
            initial={asteroidAnimations[index]?.initial}
            animate={asteroidAnimations[index]?.animate}
            transition={asteroidAnimations[index]?.transition}
          >
            <LargeAsteroid2 />
          </motion.div>
        )
      ))}
    </section>
  );
}