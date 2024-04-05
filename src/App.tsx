import { useGSAP } from '@gsap/react';

import './styles/App.scss';
import { handleRotate } from './util/handleRotate';
import OrbitingPlanets from './components/OrbitingPlanets/OrbitingPlanets';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import FAQ from './pages/FAQ/FAQ';
import Timeline from './pages/Timeline/Timeline';
import Judges from './pages/Judges/Judges';
import { useRef, useState } from 'react';
import LogoAndRegister from './components/LogoAndRegister/LogoAndRegister';

function Rotate() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const scroll1Ref = useRef<HTMLElement>(null);
  const scroll2Ref = useRef<HTMLElement>(null);
  const scroll3Ref = useRef<HTMLElement>(null);
  const scroll4Ref = useRef<HTMLDivElement>(null);
  const planetRef = useRef<SVGSVGElement>(null);
  const fakeLogoRef = useRef<HTMLImageElement>(null);
  const fakeRegisterRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const scrollRefList = [scroll1Ref, scroll2Ref, scroll3Ref, scroll4Ref];

  const [pausedPlanet, setPausedPlanet] = useState('');

  console.log(pausedPlanet);

  useGSAP(() => {
    handleRotate(planetRef);
  });

  return (
    <main ref={scrollContainerRef} className="scroll-cont">
      <OrbitingPlanets planetRef={planetRef} pausedPlanet={pausedPlanet} />
      <Navbar
        navRef={navRef}
        scrollRefList={scrollRefList}
        scrollContainerRef={scrollContainerRef}
        setPausedPlanet={setPausedPlanet}
      />
      <LogoAndRegister
        navRef={navRef}
        scrollContainerRef={scrollContainerRef}
        fakeLogoRef={fakeLogoRef}
        fakeRegisterRef={fakeRegisterRef}
      />
      <Home
        scroll1Ref={scroll1Ref}
        fakeLogoRef={fakeLogoRef}
        fakeRegisterRef={fakeRegisterRef}
      />
      <FAQ scroll2Ref={scroll2Ref} />
      <Timeline scroll3Ref={scroll3Ref} />
      <Judges scroll4Ref={scroll4Ref} />
    </main>
  );
}

export default Rotate;
