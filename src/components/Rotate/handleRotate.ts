import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

export function handleRotate() {
  mm.add('(min-width: 1200px)', () => {
    //Gsap Scroll Triggers for rotating pages in
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
      transformOrigin: '16% 74%',
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
        end: 'top',
        markers: {
          startColor: 'white',
          endColor: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          indent: 20
        }
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
        end: 'bottom 1%',
        markers: {
          startColor: 'red',
          endColor: 'red',
          fontSize: '18px',
          fontWeight: 'bold',
          indent: 20
        }
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
      transformOrigin: '16% 74%',
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
      transformOrigin: '16% 74%',
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
      transformOrigin: '16% 74%',
      duration: 1,
      ease: 'none'
    });

    return () => {
      // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
      // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
    };
  });
}
