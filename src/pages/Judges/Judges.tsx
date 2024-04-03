import "./Judges.scss";
import JudgeCard from "../../components/JudgeCard/JudgeCard";
import { useRef } from "react";
import { JudgeList } from "./JudgeList";
import useIsDesktop from "../../util/useIsDesktop";

export default function Judges() {
  const judge1Ref = useRef(null);
  const judge2Ref = useRef(null);
  const judge1ContainerRef = useRef(null);
  const judge2ContainerRef = useRef(null);

  const isDesktop = useIsDesktop();

  return (
    <div className="judges">
      {isDesktop ? (
        <>
          <section className="desktop" ref={judge1ContainerRef}>
            <div ref={judge1Ref} className="card-container">
              <h2>Judges</h2>
              {JudgeList.slice(0, 3).map((item) => (
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
          <section className="desktop" ref={judge2ContainerRef}>
            <div ref={judge2Ref} className="judges-container">
              <h2>Judges</h2>
              {JudgeList.slice(3, 5).map((item) => (
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
        </>
      ) : (
        <section className="mobile">
          <div ref={judge2Ref} className="judges-container">
            <h2>Judges</h2>
            {JudgeList.map((item) => (
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
