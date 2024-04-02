import Home from '../../pages/Home/Home';
import FAQ from '../../pages/FAQ/FAQ';
import Timeline from '../../pages/Timeline/Timeline';
import Judges from '../../pages/Judges/Judges';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './Rotate.scss';

function Rotate() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to('.one', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-one',
        scrub: 0.01,
        start: 'bottom 99%',
        end: 'bottom'
      },
      rotation: -80,
      transformOrigin: '16% 74%',
      opacity: 0,
      duration: 1,
      ease: 'none'
    });

    gsap.from('.two', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-two',
        scrub: 1,
        start: 'top 99%',
        end: 'top',
        markers: {
          startColor: 'purple',
          endColor: 'fuchsia',
          fontSize: '2rem',
          indent: 100,
          fontWeight: 'normals'
        }
      },
      x: -340,
      y: 200,
      duration: 1,
      ease: 'in'
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

    gsap.from('.three', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-three',
        scrub: 1,
        start: 'top 99%',
        end: 'top'
      },
      x: -340,
      y: 200,
      duration: 1,
      ease: 'in'
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

    gsap.from('.four', {
      scrollTrigger: {
        scroller: '.scroll-cont',
        trigger: '.scroll-section-four',
        scrub: 1,
        start: 'top 99%',
        end: 'top',
        markers: {
          startColor: 'purple',
          endColor: 'fuchsia',
          fontSize: '2rem',
          indent: 100,
          fontWeight: 'normals'
        }
      },
      x: -340,
      y: 200,
      duration: 1,
      ease: 'in'
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

    /*
      
       
       gsap.to(".three", {
        scrollTrigger: {
            trigger: ".three",
            scrub: 1,
            start: 'top top',
            end: '+=50',
        },
        rotation: 60,
        duration: 3,
        ease: "none",
       })
       gsap.to(".three", {
        scrollTrigger: {
            trigger: ".three",
            scrub: 1,
            start: 'bottom bottom',
            end: '+=50',
        },
        rotation: -60,
        duration: 3,
        ease: "none",
       })
       gsap.to(".four", {
        scrollTrigger: {
            trigger: ".four",
            scrub: 1,
            start: 'bottom bottom',
            end: '+=5000',
        },
        rotation: -60,
        duration: 3,
        ease: "none",
       })
        */
  });

  return (
    <main className="scroll-cont">
      <section className="scroll-section-one">
        <div className="one">
          <Home />
        </div>
      </section>
      <section className="scroll-section-two">
        <div className="two">
          <FAQ />
        </div>
      </section>
      <section className="scroll-section-three">
        <div className="three">
          <Timeline />
        </div>
      </section>
      <section className="scroll-section-four">
        <div className="four">
          <Judges />
        </div>
      </section>
    </main>
  );
}

export default Rotate;
