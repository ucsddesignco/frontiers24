import './JudgeCard.scss';
interface JudgeProps {
  name: string;
  pronouns: string;
  position: string;
  funFact: string;
  imgLink: string;
  linkedin: string;
}

const JudgeCard = ({
  name,
  pronouns,
  position,
  funFact,
  imgLink,
  linkedin
}: JudgeProps) => {
  return (
    //prettier-ignore
    <div className="judge-card">
      <div className="svg-container">
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <img src={imgLink} alt={'Headshot of ' + name} />
        </a>
        <svg className='orange-bar' width="37" height="160" viewBox="0 0 37 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.664307 159.231H9.66431L37 0H28L0.664307 159.231Z" fill="#FF671E"/>
        </svg>
      </div>
      <div className="judge-info">
        <h3>
          {name} <span>({pronouns})</span>
        </h3>
        <p>{position}</p>
          <p
            data-tooltip-id={`${name}-tooltip`}
            data-tooltip-content={funFact}
            data-tooltip-place="bottom"
            className="trigger"
          >
            See my fun fact!
          </p>
      </div>
      
    </div>
  );
};

export default JudgeCard;
