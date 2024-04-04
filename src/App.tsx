import './styles/App.scss';
import OrbitingPlanets from './components/OrbitingPlanets/OrbitingPlanets';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import FAQ from './pages/FAQ/FAQ';
import Timeline from './pages/Timeline/Timeline';
import Judges from './pages/Judges/Judges';
import Asteroid from './components/Asteroid/Asteroid';
import { useRef } from 'react';

function App() {
  const homeRef = useRef<HTMLElement>(null);

  return (
    <main className="main-content">
      <Asteroid homeRef={homeRef}/>
      <OrbitingPlanets />
      <Navbar />
      <Home homeRef={homeRef}/>
      <FAQ />
      <Timeline />
      <Judges />
    </main>
  );
}

export default App;
