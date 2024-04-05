import './Judges.scss';
import JudgeCard from '../../components/JudgeCard/JudgeCard';
import { JudgeList } from './JudgeList';
import useIsDesktop from '../../util/useIsDesktop';

type JudgesProps = {
  scroll4Ref: React.RefObject<HTMLDivElement>;
};

export default function Judges({ scroll4Ref }: JudgesProps) {
  const isDesktop = useIsDesktop();

  return (
    <div className="judges">
      {isDesktop ? (
        <>
          <div className="scroll-section-five">
            <section ref={scroll4Ref} className="five desktop">
              <div className="card-container">
                <h2>Judges</h2>
                {JudgeList.slice(0, 3).map(item => (
                  <JudgeCard
                    key={item.name}
                    name={item.name}
                    pronouns={item.pronouns}
                    position={item.position}
                    funFact={item.funFact}
                    imgLink={item.imgLink}
                    linkedin={item.linkedin}
                  />
                ))}
              </div>
            </section>
          </div>
          <div className="scroll-section-six">
            <section className="six desktop">
              <div className="card-container">
                <h2>Judges</h2>
                {JudgeList.slice(3, 5).map(item => (
                  <JudgeCard
                    key={item.name}
                    name={item.name}
                    pronouns={item.pronouns}
                    position={item.position}
                    funFact={item.funFact}
                    imgLink={item.imgLink}
                    linkedin={item.linkedin}
                  />
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        <section className="mobile">
          <div className="judges-container">
            <h2>Judges</h2>
            {JudgeList.map(item => (
              <JudgeCard
                key={item.name}
                name={item.name}
                pronouns={item.pronouns}
                position={item.position}
                funFact={item.funFact}
                imgLink={item.imgLink}
                linkedin={item.linkedin}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
