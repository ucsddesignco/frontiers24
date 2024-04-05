import './Home.scss';
import Logo from '../../../public/Logo.svg';
import { useRef } from 'react';

//write the typescript type for this prop

type HomeProps = {
  scroll1Ref: React.RefObject<HTMLElement>;
  fakeLogoRef: React.RefObject<HTMLImageElement>;
  fakeRegisterRef: React.RefObject<HTMLDivElement>;
};

export default function Home({
  scroll1Ref,
  fakeLogoRef,
  fakeRegisterRef
}: HomeProps) {
  const mobileDateRef = useRef(null);

  return (
    <div className="scroll-section-one">
      <section ref={scroll1Ref} className="one home">
        <div className="landing-container">
          <div className="right-container">
            <div className="logo-container">
              <img
                ref={fakeLogoRef}
                src={Logo}
                className="fake-logo"
                alt="Design Frontiers Logo"
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
                  Saturday, May 20th <br />
                  9am-5pm
                </h3>
                <h3>DIB ROOM 208</h3>
              </div>
            </div>
            <div className="register-button" ref={fakeRegisterRef}>
              <a className="button parallelogram" href="#">
                <span className="skew-fix">REGISTER NOW</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
