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
import Recap from './pages/Recap/Recap';
import { useNavigation } from './util/useNavigation';

function App() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const scroll1Ref = useRef<HTMLElement>(null);
  const scroll2Ref = useRef<HTMLElement>(null);
  const scroll3Ref = useRef<HTMLElement>(null);
  const scroll4Ref = useRef<HTMLDivElement>(null);
  const scroll5Ref = useRef<HTMLDivElement>(null);
  const planetRef = useRef<SVGSVGElement>(null);
  const fakeLogoRef = useRef<HTMLImageElement>(null);
  const fakeRegisterRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileFAQRef = useRef<HTMLDivElement>(null);
  const mobileJudgesRef = useRef<HTMLDivElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const mobileRecapRef = useRef<HTMLDivElement>(null);

  const scrollRefList = [
    scroll1Ref,
    scroll2Ref,
    scroll3Ref,
    scroll4Ref,
    scroll5Ref
  ];
  const mobileScrollRefList = [
    scroll1Ref,
    mobileFAQRef,
    scroll3Ref,
    mobileJudgesRef,
    mobileRecapRef
  ];

  const [pausedPlanet, setPausedPlanet] = useState('');

  useGSAP(() => {
    handleRotate(planetRef);
  });

  const {
    navigateToPage,
    pageSelected,
    navLinks,
    isHamburgerOpen,
    toggleHamburger
  } = useNavigation({
    scrollContainerRef,
    mobileScrollRefList,
    scrollRefList,
    setPausedPlanet
  });

  return (
    <main ref={scrollContainerRef} className="scroll-cont">
      <Asteroid homeRef={homeRef} />
      <OrbitingPlanets planetRef={planetRef} pausedPlanet={pausedPlanet} />
      <Navbar
        navLinks={navLinks}
        isHamburgerOpen={isHamburgerOpen}
        toggleHamburger={toggleHamburger}
        pageSelected={pageSelected}
        navRef={navRef}
      />
      <LogoAndRegister
        navRef={navRef}
        scrollContainerRef={scrollContainerRef}
        fakeLogoRef={fakeLogoRef}
        fakeRegisterRef={fakeRegisterRef}
        logoLoaded={logoLoaded}
        navigateToPage={navigateToPage}
      />
      <Home
        homeRef={homeRef}
        scroll1Ref={scroll1Ref}
        fakeLogoRef={fakeLogoRef}
        fakeRegisterRef={fakeRegisterRef}
        setLogoLoaded={setLogoLoaded}
        navigateToPage={navigateToPage}
      />
      <FAQ scroll2Ref={scroll2Ref} mobileFAQRef={mobileFAQRef} />
      <Timeline scroll3Ref={scroll3Ref} />
      <Judges scroll4Ref={scroll4Ref} mobileJudgesRef={mobileJudgesRef} />
      <JudgeFunFacts />
      <Recap scroll5Ref={scroll5Ref} mobileRecapRef={mobileRecapRef} />
      <MobileFooter />
    </main>
  );
}

export default App;
