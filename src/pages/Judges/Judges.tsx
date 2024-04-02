import "./Judges.scss";
import JudgeComponent from "../../components/JudgeComponent/JudgeComponent";
import { useRef } from "react";
import { JudgeInfo } from "./JudgeInfo";
import useIsDesktop from "../../util/useIsDesktop";

export default function Judges() {
  const judge1Ref = useRef(null);
  const judge2Ref = useRef(null);
  const judge1ContainerRef = useRef(null);
  const judge2ContainerRef = useRef(null);

  const isDesktop = useIsDesktop();

  console.log(JudgeInfo.slice(3, 5));

  return (
    <div className="judge-stuff">
      {isDesktop ? (
        <>
          <section className="desktop judges" ref={judge1ContainerRef}>
            <div ref={judge1Ref} className="judges-container">
              <h2>Judges</h2>
              {JudgeInfo.slice(0, 3).map((item) => (
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
          <section className="desktop judges" ref={judge2ContainerRef}>
            <div ref={judge2Ref} className="judges-container">
              <h2>Judges</h2>
              {JudgeInfo.slice(3, 5).map((item) => (
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
        </>
      ) : (
        <section className="mobile judges">
          <div ref={judge2Ref} className="judges-container">
            <h2>Judges</h2>
            {JudgeInfo.map((item) => (
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
