import './Home.scss';
import Logo from '/images/Logo.svg';
import { useRef } from 'react';
import mobilePlanets from '/images/mobile-planets.svg';
import { Pages } from '../../util/useNavigation';

type HomeProps = {
  homeRef: React.RefObject<HTMLDivElement>;
  scroll1Ref: React.RefObject<HTMLElement>;
  fakeLogoRef: React.RefObject<HTMLImageElement>;
  fakeRegisterRef: React.RefObject<HTMLDivElement>;
  setLogoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  navigateToPage: (page: Pages, pageIndex: number) => void;
};

export default function Home({
  homeRef,
  scroll1Ref,
  fakeLogoRef,
  fakeRegisterRef,
  setLogoLoaded,
  navigateToPage
}: HomeProps) {
  const mobileDateRef = useRef(null);

  return (
    <div ref={homeRef} className="scroll-section-one">
      <section ref={scroll1Ref} className="one home">
        <div className="logo-container">
          <img
            ref={fakeLogoRef}
            src={Logo}
            className="fake-logo"
            alt="Design Frontiers Logo"
            aria-hidden="true"
            onLoad={() => {
              setLogoLoaded(true);
            }}
          />
          <img src={Logo} className="mobile-logo" alt="" />
        </div>
        <div className="home-info">
          <div className="desktop-view">
            <h3>Saturday, April 13th | 9am–5pm | DIB 208</h3>
            <p>Journey beyond the horizons of innovation!</p>
            <p>
              Design Frontiers is Design Co&apos;s very own long day sprint,
              where student teams of all backgrounds come together to create
              innovative solutions for real-world problems.
            </p>
          </div>
          <div ref={mobileDateRef} className="mobile-h3-container">
            <h3>
              Saturday, April 13th <br />
              9am-5pm
            </h3>
            <h3>DIB 208</h3>
          </div>
        </div>
        <div
          className={`register-button`}
          ref={fakeRegisterRef}
          aria-hidden="true"
        >
          <button
            onClick={() => {
              navigateToPage('Recap', 4);
            }}
            className="button parallelogram"
          >
            <span className="skew-fix">VIEW CASE STUDIES</span>
          </button>
        </div>
        <img
          className="mobile-planets"
          src={mobilePlanets}
          alt="A blue, purple, red, and yellow planet on orbit lines"
        />
      </section>
    </div>
  );
}
