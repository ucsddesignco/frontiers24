import { useGSAP } from '@gsap/react';

import './styles/App.scss';
import { handleRotate } from './util/handleRotate';
import OrbitingPlanets from './components/OrbitingPlanets/OrbitingPlanets';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import FAQ from './pages/FAQ/FAQ';
import Timeline from './pages/Timeline/Timeline';
import Judges from './pages/Judges/Judges';
import { useRef } from 'react';

function Rotate() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const scroll1Ref = useRef<HTMLElement>(null);
  const scroll2Ref = useRef<HTMLElement>(null);
  const scroll3Ref = useRef<HTMLElement>(null);
  const scroll4Ref = useRef<HTMLElement>(null);
  const planetRef = useRef<SVGSVGElement>(null);
  const yellowPlanetRef = useRef<SVGSVGElement>(null);
  const redPlanetRef = useRef<SVGSVGElement>(null);
  const purplePlanetRef = useRef<SVGSVGElement>(null);
  const bluePlanetRef = useRef<SVGSVGElement>(null);

  const scrollRefList = [scroll1Ref, scroll2Ref, scroll3Ref, scroll4Ref];

  useGSAP(() => {
    handleRotate(
      planetRef,
      yellowPlanetRef,
      redPlanetRef,
      purplePlanetRef,
      bluePlanetRef
    );
  });

  return (
    <main ref={scrollContainerRef} className="scroll-cont">
      <OrbitingPlanets
        planetRef={planetRef}
        yellowPlanetRef={yellowPlanetRef}
        redPlanetRef={redPlanetRef}
        purplePlanetRef={purplePlanetRef}
        bluePlanetRef={bluePlanetRef}
      />
      <Navbar
        scrollRefList={scrollRefList}
        scrollContainerRef={scrollContainerRef}
      />
      <section ref={scroll1Ref} className="scroll-section-one">
        <div className="one">
          <Home />
        </div>
      </section>
      <section ref={scroll2Ref} className="scroll-section-two">
        <div className="two">
          <FAQ />
        </div>
      </section>
      <section ref={scroll3Ref} className="scroll-section-three">
        <div className="three">
          <Timeline />
        </div>
      </section>
      <section ref={scroll4Ref} className="scroll-section-four">
        <div className="four">
          <Judges />
        </div>
      </section>
    </main>
  );
}

export default Rotate;
