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
import Asteroid from './components/Asteroid/Asteroid';
import JudgeFunFacts from './components/JudgeFunFacts/JudgeFunFacts';
import MobileFooter from './components/MobileFooter/MobileFooter';

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
  const mobileFAQRef = useRef<HTMLDivElement>(null);
  const mobileJudgesRef = useRef<HTMLDivElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);

  const scrollRefList = [scroll1Ref, scroll2Ref, scroll3Ref, scroll4Ref];
  const mobileScrollRefList = [
    scroll1Ref,
    mobileFAQRef,
    scroll3Ref,
    mobileJudgesRef
  ];

  const [pausedPlanet, setPausedPlanet] = useState('');
  const registerClosed = true;

  useGSAP(() => {
    handleRotate(planetRef);
  });

  return (
    <main ref={scrollContainerRef} className="scroll-cont">
      <Asteroid homeRef={homeRef} />
      <OrbitingPlanets planetRef={planetRef} pausedPlanet={pausedPlanet} />
      <Navbar
        navRef={navRef}
        scrollRefList={scrollRefList}
        scrollContainerRef={scrollContainerRef}
        setPausedPlanet={setPausedPlanet}
        mobileScrollRefList={mobileScrollRefList}
      />
      <LogoAndRegister
        registerClosed={registerClosed}
        navRef={navRef}
        scrollContainerRef={scrollContainerRef}
        fakeLogoRef={fakeLogoRef}
        fakeRegisterRef={fakeRegisterRef}
        logoLoaded={logoLoaded}
      />
      <Home
        registerClosed={registerClosed}
        homeRef={homeRef}
        scroll1Ref={scroll1Ref}
        fakeLogoRef={fakeLogoRef}
        fakeRegisterRef={fakeRegisterRef}
        setLogoLoaded={setLogoLoaded}
      />
      <FAQ scroll2Ref={scroll2Ref} mobileFAQRef={mobileFAQRef} />
      <Timeline scroll3Ref={scroll3Ref} />
      <Judges scroll4Ref={scroll4Ref} mobileJudgesRef={mobileJudgesRef} />
      <JudgeFunFacts />
      <MobileFooter />
    </main>
  );
}

export default Rotate;
