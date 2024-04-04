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
  const [contentInfo, setContentInfo] = useState({paddingLeft: 0, width: 0});

  type Point = {
        x: number;
        y: number;
   };

  const generateStartPT = () => {
    const startPT = { x: -(Math.random() * window.innerWidth/4), y: Math.random() * window.innerHeight}
    return startPT
  }

  const generateEndPT = () => {
    const boundaryOffset = 100;
    const contentPaddingLeft = contentInfo.paddingLeft;
    const contentWidth = contentInfo.width;
    const contentMidPoint = contentPaddingLeft + contentWidth/2;

    let endX = Math.min(contentPaddingLeft - 94, Math.random() * window.innerWidth + boundaryOffset);

    if(endX < contentMidPoint) { 
      endX = Math.min(contentPaddingLeft, endX)
    }

    if(endX > contentMidPoint) {
        endX = Math.max(contentPaddingLeft + contentWidth, endX)
    }

    const endPT = {x: endX, 
                  y: Math.random() * window.innerHeight
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

    const speed = 500; // pixels per second
    const duration = distance / speed; // seconds

    return {
      initial: startPT,
      animate: endPT,
      transition: { duration: duration }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const homeElement = homeRef.current;
    if (homeElement) {
      const style = window.getComputedStyle(homeElement);
      const paddingLeftValue = style.paddingLeft;
      setContentInfo({paddingLeft: parseFloat(paddingLeftValue), width: homeElement.getBoundingClientRect().width});

      setNumAsteroids(5);
    }
  }, [])
    
  return (
    <div className='asteroid-container'>
      {Array.from({ length: numAsteroids }, (_, index) => (
      <motion.div 
        key={index}
        className='asteroid'
        {...generateAnimationProps()}
      >
        <LargeAsteroid2 />
      </motion.div>
    ))}
    </div>
  );
}