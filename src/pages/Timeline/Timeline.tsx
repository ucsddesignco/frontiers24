import './Timeline.scss';
import { TimelineInfo } from './TimelineInfo';

{
  /* Timeline List*/
}

type TimelineProps = {
  scroll3Ref: React.RefObject<HTMLElement>;
};

export default function Timeline({ scroll3Ref }: TimelineProps) {
  return (
    <div className="scroll-section-four">
      <section ref={scroll3Ref} className="four timeline">
        <ul>
          <div>
            <h1 className="title">Timeline</h1>
            {TimelineInfo.map((item, index) => (
              <li key={index}>
                <p className="time">{item.time}</p>
                <div className="orange-line"></div>
                <div className="title-discription">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </section>
    </div>
  );
}
