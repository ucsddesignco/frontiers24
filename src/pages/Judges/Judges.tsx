import './Judges.scss';
import JudgeComponent from '../../components/JudgeComponent/JudgeComponent';
import { useRef } from 'react';
import { JudgeInfo } from './JudgeInfo';
import useIsDesktop from '../../util/useIsDesktop';

type JudgesProps = {
  scroll4Ref: React.RefObject<HTMLElement>;
};

export default function Judges({ scroll4Ref }: JudgesProps) {
  const judge1Ref = useRef(null);
  const judge2Ref = useRef(null);

  const isDesktop = useIsDesktop();

  return (
    <div className="judge-stuff">
      {isDesktop ? (
        <>
          <div className="scroll-section-five">
            <section ref={scroll4Ref} className="five desktop judges">
              <div ref={judge1Ref} className="judges-container">
                <h2>Judges</h2>
                {JudgeInfo.slice(0, 3).map(item => (
                  <JudgeComponent
                    key={item.name}
                    name={item.name}
                    pronouns={item.pronouns}
                    position={item.position}
                    funFact={item.funFact}
                    imgLink={item.imgLink}
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="scroll-section-six">
            <section className="six desktop judges">
              <div ref={judge2Ref} className="judges-container">
                <h2>Judges</h2>
                {JudgeInfo.slice(3, 5).map(item => (
                  <JudgeComponent
                    key={item.name}
                    name={item.name}
                    pronouns={item.pronouns}
                    position={item.position}
                    funFact={item.funFact}
                    imgLink={item.imgLink}
                  />
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        <section className="mobile judges">
          <div ref={judge2Ref} className="judges-container">
            <h2>Judges</h2>
            {JudgeInfo.map(item => (
              <JudgeComponent
                key={item.name}
                name={item.name}
                pronouns={item.pronouns}
                position={item.position}
                funFact={item.funFact}
                imgLink={item.imgLink}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
