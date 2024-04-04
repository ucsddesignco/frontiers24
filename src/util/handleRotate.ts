import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const mm = gsap.matchMedia();

//Default transform origin
let transformOrigin = '16% 74%';

export function handleRotate(
  planetRef: React.RefObject<SVGSVGElement>,
  yellowPlanetRef: React.RefObject<SVGSVGElement>,
  redPlanetRef: React.RefObject<SVGSVGElement>,
  purplePlanetRef: React.RefObject<SVGSVGElement>,
  bluePlanetRef: React.RefObject<SVGSVGElement>
) {
  const planetInfo = planetRef.current?.getBoundingClientRect();
  if (planetInfo) {
    const planetMidX = planetInfo?.left + planetInfo?.width / 2;
    const planetMidY = planetInfo?.top + planetInfo?.height / 2;
    //Offset so it's not too close to planet
    const xOffset = -150;
    const yOffset = 100;
    transformOrigin = `${planetMidX + xOffset}px ${planetMidY + yOffset}px`;

    const planetRefs = [
      yellowPlanetRef,
      redPlanetRef,
      purplePlanetRef,
      bluePlanetRef
    ];
    planetRefs.map(planetRef => {
      const planetBoundingRect = planetRef.current?.getBoundingClientRect();
      if (planetBoundingRect) {
        const originOffsetX = planetMidX - planetBoundingRect?.left;
        const originOffsetY = planetMidY - planetBoundingRect?.top;
        console.log(planetBoundingRect?.top);
        if (planetRef.current) {
          planetRef.current.style.transformOrigin = `${originOffsetX}px ${originOffsetY}px`;
          console.log(
            planetRef.current,
            `${originOffsetX}px ${originOffsetY}px`
          );
        }
      }
    });
  }

  mm.add('(min-width: 1200px)', () => {
    //Gsap Scroll Triggers for rotating pages in
    gsap.to(
      ['#planet1-yellow', '#planet2-red', '#planet3-purple', '#planet4-blue'],
      {
        scrollTrigger: {
          scroller: '.scroll-cont',
          trigger: '.scroll-section-one',
          scrub: 0.01,
          //Where animation starts and ends
          start: 'bottom 99%',
          end: 'bottom'
        },
        rotation: 360,
        //Transform Origin makes the illusion that the planet is translating
        //   transformOrigin: 'center, center',
        duration: 1,
        ease: 'none'
      }
    );

    gsap.to('.one', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-one',
        scrub: 0.01,
        //Where animation starts and ends
        start: 'bottom 99%',
        end: 'bottom'
      },
      rotation: -80,
      //Transform Origin makes the illusion that the planet is translating
      transformOrigin: transformOrigin,
      x: -200,
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'none'
    });

    gsap.from('.two', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-two',
        scrub: 0.1,
        start: 'top 99%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      x: -1000,
      y: 200,
      ease: 'out'
    });

    gsap.from('.two', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-two',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 99%',
        end: 'bottom 1%'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });
    gsap.to('.two', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-two',
        scrub: 0.01,
        start: 'top 99%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });

    //Opacity Shifts
    gsap.from('.three', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-three',
        scrub: 0.1,
        start: 'top 99%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      ease: 'out',
      x: -1000,
      y: 200
    });

    gsap.from('.three', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-three',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 99%',
        end: 'bottom'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });

    gsap.to('.three', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-three',
        scrub: 0.01,
        start: 'top 99%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });

    //Opacity Shifts
    gsap.from('.four', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-four',
        scrub: 0.1,
        start: 'top 99%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      ease: 'out',
      x: -1000,
      y: 200
    });

    gsap.from('.four', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-four',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 100%',
        end: 'bottom'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });

    gsap.to('.four', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-four',
        scrub: 0.01,
        start: 'top 99%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });

    return () => {
      // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
      // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
    };
  });
}
