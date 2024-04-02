import './styles/App.scss';
import OrbitingPlanets from './components/OrbitingPlanets/OrbitingPlanets';
import Navbar from './components/Navbar/Navbar';
/*
import Home from './pages/Home/Home';

import FAQ from './pages/FAQ/FAQ';
import Timeline from './pages/Timeline/Timeline';
import Judges from './pages/Judges/Judges';
*/
import Rotate from './components/Rotate/Rotate';

function App() {
  return (
    <main className="main-content">
      <OrbitingPlanets />
      <Navbar />
      <Rotate />
    </main>
  );
}

export default App;
