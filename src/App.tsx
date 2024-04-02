import './styles/App.scss';
import OrbitingPlanets from './components/OrbitingPlanets/OrbitingPlanets';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import FAQ from './pages/FAQ/FAQ';
import Timeline from './pages/Timeline/Timeline';
import Judges from './pages/Judges/Judges';

function App() {
  return (
    <main className="main-content">
      <OrbitingPlanets />
      <Navbar />
      <Home />
      <FAQ />
      <Timeline />
      <Judges />
    </main>
  );
}

export default App;
