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

export function handleRotate(planetRef: React.RefObject<SVGSVGElement>) {
  const planetInfo = planetRef.current?.getBoundingClientRect();
  if (planetInfo) {
    const planetMidX = planetInfo?.left + planetInfo?.width / 2;
    const planetMidY = planetInfo?.top + planetInfo?.height / 2;
    //Offset so it's not too close to planet
    const xOffset = -150;
    const yOffset = 100;
    transformOrigin = `${planetMidX + xOffset}px ${planetMidY + yOffset}px`;
  }

  mm.add('(min-width: 1200px)', () => {
    //Gsap Scroll Triggers for rotating pages in
    gsap.to('.one', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-one',
        scrub: 0.01,
        //Where animation starts and ends
        start: 'bottom 100%',
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
        start: 'top 100%',
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
        start: 'bottom 100%',
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
        start: 'top 100%',
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
        start: 'top 100%',
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
        start: 'bottom 100%',
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
        start: 'top 100%',
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
        start: 'top 100%',
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
        start: 'top 100%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });

    gsap.from('.five', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-five',
        scrub: 0.1,
        start: 'top 100%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      ease: 'out',
      x: -1000,
      y: 200
    });

    gsap.from('.five', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-five',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 100%',
        end: 'bottom'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });

    gsap.to('.five', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-five',
        scrub: 0.01,
        start: 'top 100%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });

    gsap.from('.six', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-six',
        scrub: 0.1,
        start: 'top 100%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      ease: 'out',
      x: -1000,
      y: 200
    });

    gsap.from('.six', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-six',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 100%',
        end: 'bottom'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });

    gsap.to('.six', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-six',
        scrub: 0.01,
        start: 'top 100%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });
    gsap.from('.seven', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-seven',
        scrub: 0.1,
        start: 'top 100%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      ease: 'out',
      x: -1000,
      y: 200
    });

    gsap.from('.seven', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-seven',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 100%',
        end: 'bottom'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });

    gsap.to('.seven', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-seven',
        scrub: 0.01,
        start: 'top 100%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: transformOrigin,
      duration: 1,
      ease: 'none'
    });
    gsap.from('.eight', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-eight',
        scrub: 0.1,
        start: 'top 100%',
        end: 'top'
      },
      opacity: 0,
      duration: 1,
      ease: 'out',
      x: -1000,
      y: 200
    });

    gsap.from('.eight', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-eight',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 100%',
        end: 'bottom'
      },
      opacity: 1,
      duration: 1,
      ease: 'none'
    });

    gsap.to('.eight', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-eight',
        scrub: 0.01,
        start: 'top 100%',
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
