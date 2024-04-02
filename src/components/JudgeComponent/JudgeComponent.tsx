import "./JudgeComponent.scss";

interface JudgeProps {
  name: string;
  pronouns: string;
  position: string;
  funFact: string;
  imgLink: string;
}

const JudgeComponent = ({
  name,
  pronouns,
  position,
  funFact,
  imgLink,
}: JudgeProps) => {
  // Convert name to image ID
  const imageID = name.split(" ").join("_").toLowerCase();
  return (
    //prettier-ignore
    <div className="judge-card">
      <div className="svg-container">
        <svg className='svg-image' width="161" height="160" viewBox="0 0 161 160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="trapezoidMask">
              <rect width="161" height="160" fill="black"/>
              <path d="M0 159.231L27.3357 0H161L133.664 159.231H0Z" fill="white"/>
            </mask>
          </defs>
          <rect width="161" height="160" mask="url(#trapezoidMask)" fill={`url(#${imageID})`}/>
          <pattern id={imageID} patternUnits="userSpaceOnUse" width="161" height="160">
            <image href={imgLink} className="judge-image" preserveAspectRatio="xMidYMid slice"/>
          </pattern>
        </svg>
        <svg className='orange-bar' width="37" height="160" viewBox="0 0 37 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.664307 159.231H9.66431L37 0H28L0.664307 159.231Z" fill="#FF671E"/>
        </svg>
      </div>
      <div className="judge-info">
        <h3>{name}</h3>
        <p>{pronouns}</p>
        <p>{position}</p>
        <p className="fun-fact">Fun Fact: {funFact}</p>
      </div>
    </div>
  );
};

export default JudgeComponent;
