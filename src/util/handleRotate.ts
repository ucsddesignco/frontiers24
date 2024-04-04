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
        if (planetRef.current) {
          planetRef.current.style.transformOrigin = `${originOffsetX}px ${originOffsetY}px`;
        }
      }
    });
  }

  mm.add('(min-width: 1200px)', () => {
    //Gsap Scroll Triggers for rotating pages in

    // Planet Orbit Animations

    const HomePlanetStates = {
      yellow: 0,
      red: '-120',
      purple: 100,
      blue: '-90'
    };
    const FaqPlanetStates = {
      yellow: '120_ccw',
      red: '-10_cw',
      purple: 0,
      blue: '-35_cw'
    };
    const TimelinePlanetStates = {
      yellow: '0_ccw',
      red: '-140_ccw',
      purple: '50_ccw',
      blue: '10_ccw'
    };
    const JudgesPlanetStates = {
      yellow: '140_cw',
      red: '-77_ccw',
      purple: '120_cw',
      blue: '-80_ccw'
    };

    const tlHome = gsap.timeline({
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-one',
        scrub: true,
        //Where animation starts and ends
        start: 'bottom 99%',
        end: 'bottom'
      }
    });
    tlHome.add('start');
    tlHome.fromTo(
      '#planet1-yellow',
      { rotation: HomePlanetStates['yellow'] },
      { rotation: FaqPlanetStates['yellow'], ease: 'out' },
      'start'
    );
    tlHome.fromTo(
      '#planet2-red',
      { rotation: HomePlanetStates['red'] },
      { rotation: FaqPlanetStates['red'], ease: 'out' },
      'start'
    );
    tlHome.fromTo(
      '#planet3-purple',
      { rotation: HomePlanetStates['purple'] },
      { rotation: FaqPlanetStates['purple'], ease: 'out' },
      'start'
    );
    tlHome.fromTo(
      '#planet4-blue',
      { rotation: HomePlanetStates['blue'] },
      { rotation: FaqPlanetStates['blue'], ease: 'out' },
      'start'
    );
    tlHome.to(
      '.one',
      {
        rotation: -80,
        //Transform Origin makes the illusion that the planet is translating
        transformOrigin: transformOrigin,
        x: -200,
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'none'
      },
      'start'
    );

    const tlFaq = gsap.timeline({
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-two',
        scrub: 0.1,
        //Where animation starts and ends
        start: 'bottom 99%',
        end: 'bottom 1%'
      }
    });
    tlFaq.add('start');
    tlFaq.to(
      '#planet1-yellow',
      { rotation: TimelinePlanetStates['yellow'], ease: 'out' },
      'start'
    );
    tlFaq.to(
      '#planet2-red',
      { rotation: TimelinePlanetStates['red'], ease: 'out' },
      'start'
    );
    tlFaq.to(
      '#planet3-purple',
      { rotation: TimelinePlanetStates['purple'], ease: 'out' },
      'start'
    );
    tlFaq.to(
      '#planet4-blue',
      { rotation: TimelinePlanetStates['blue'], ease: 'out' },
      'start'
    );
    tlFaq.from('.two', { opacity: 1, duration: 1, ease: 'none' }, 'start');

    const tlTimeline = gsap.timeline({
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-four',
        scrub: 0.1,
        start: 'top 99%',
        end: 'top'
      }
    });
    tlTimeline.add('start');
    tlTimeline.to(
      '#planet1-yellow',
      { rotation: JudgesPlanetStates['yellow'], ease: 'out' },
      'start'
    );
    tlTimeline.to(
      '#planet2-red',
      { rotation: JudgesPlanetStates['red'], ease: 'out' },
      'start'
    );
    tlTimeline.to(
      '#planet3-purple',
      { rotation: JudgesPlanetStates['purple'], ease: 'out' },
      'start'
    );
    tlTimeline.to(
      '#planet4-blue',
      { rotation: JudgesPlanetStates['blue'], ease: 'out' },
      'start'
    );
    tlTimeline.from(
      '.four',
      { opacity: 0, duration: 1, ease: 'out', x: -1000, y: 200 },
      'start'
    );

    // Page Rotation Animations
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
