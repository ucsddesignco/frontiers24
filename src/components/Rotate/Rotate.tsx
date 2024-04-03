import Home from '../../pages/Home/Home';
import FAQ from '../../pages/FAQ/FAQ';
import Timeline from '../../pages/Timeline/Timeline';
import Judges from '../../pages/Judges/Judges';

import { useGSAP } from '@gsap/react';

import './Rotate.scss';
import { handleRotate } from './handleRotate';

function Rotate() {
  useGSAP(() => {
    handleRotate();
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
