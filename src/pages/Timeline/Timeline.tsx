import './Timeline.scss';

{
  /* Timeline List*/
}
const TimlineList = [
  {
    time: ' 9:00 AM',
    title: 'Event Kickoff',
    description:
      'Designers will begain with registration and sign-in, an intorduction to the event, and energizing lighting talks'
  },
  {
    time: '10:00 AM',
    title: 'Sprint Starts + Lunch',
    description:
      'Participants will have around 4 hours to design for the given prompt and prepare to present their solution. '
  },
  {
    time: ' 2:00 PM',
    title: 'Sprint Ends',
    description:
      'Teams will present their design solutions to our panel of judges. Finalist presentations begin.'
  },
  {
    time: ' 4:30 PM',
    title: 'Closing Cenemony',
    description:
      '3 winners and 2 honorable mentions announced, prize distribution, and networking session.'
  },
  {
    time: ' 5:00 PM',
    title: 'Even Ends',
    description: ''
  }
];

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
            {TimlineList.map((item, index) => (
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
