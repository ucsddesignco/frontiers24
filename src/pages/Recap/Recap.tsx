import React from 'react';
import './Recap.scss';

import { Projects } from './Projects';

type RecapProps = {
  scroll5Ref: React.RefObject<HTMLDivElement>;
  mobileRecapRef: React.RefObject<HTMLDivElement>;
};

export default function Recap({ scroll5Ref, mobileRecapRef }: RecapProps) {
  return (
    <>
      <div className="scroll-section-seven">
        <section ref={scroll5Ref} className="seven recap">
          <h1>RECAP</h1>
          <p>Thanks for attending Design Frontiers 2024! </p>
          <p className="last">
            Missed out on the event? Check out all the student projects below!
          </p>

          <div className="grid-layout">
            {Projects.slice(0, 8).map((project, index) => (
              <div key={index} className="project-item">
                <div className="left">
                  <p className="project-number">{index + 1}.</p>
                </div>
                <div className="right">
                  <p className="project-name">{project.name}</p>
                  <div className="button-cont">
                    <a
                      className="btn case-study"
                      href={project.casestudylink}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <p>Case Study</p>
                    </a>
                    <a
                      className="btn slide-deck"
                      href={project.slidedecklink}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <p>Slide Deck</p>
                    </a>
                  </div>
                </div>
                {/* Render project item */}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="scroll-section-eight">
        <section className="eight recap">
          <div className="grid-layout">
            {Projects.slice(8, 16).map((project, index) => (
              <div key={index} className="project-item">
                <div className="left">
                  <p className="project-number">{index + 9}.</p>
                </div>
                <div className="right">
                  <p className="project-name">{project.name}</p>
                  <div className="button-cont">
                    <a
                      className="btn case-study"
                      href={project.casestudylink}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <p>Case Study</p>
                    </a>
                    <a
                      className="btn slide-deck"
                      href={project.slidedecklink}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <p>Slide Deck</p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mobile">
        <section ref={mobileRecapRef} className="recap">
          <h1>RECAP</h1>
          <p>Thanks for attending Design Frontiers 2024! </p>
          <p className="last">
            Missed out on the event? Check out all the student projects below!
          </p>

          <div className="grid-layout">
            {Projects.slice(0, 16).map((project, index) => (
              <div key={index} className="project-item">
                <div className="left">
                  <p className="project-number">{index + 1}.</p>
                </div>
                <div className="right">
                  <p className="project-name">{project.name}</p>
                  <div className="button-cont">
                    <a
                      className="btn case-study"
                      href={project.casestudylink}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <p>Case Study</p>
                    </a>
                    <a
                      className="btn slide-deck"
                      href={project.slidedecklink}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      <p>Slide Deck</p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
