import './Timeline.scss';
import { TimelineInfo } from './TimelineInfo';

type TimelineProps = {
  scroll3Ref: React.RefObject<HTMLElement>;
};

export default function Timeline({ scroll3Ref }: TimelineProps) {
  return (
    <div className="scroll-section-four">
      <section ref={scroll3Ref} className="four timeline">
        <h2 className="title">Timeline</h2>
        <ul>
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
        </ul>
      </section>
    </div>
  );
}
