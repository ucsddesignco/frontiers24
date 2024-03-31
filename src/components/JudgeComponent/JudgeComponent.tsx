import "./JudgeComponent.scss";

interface JudgeProps {
  name: string;
  pronouns: string;
  position: string;
  funFact: string;
  imgLink: string;
}

const JudgeComponent = (props: JudgeProps) => {
  return (
    <div className="judge-card">
      <svg
        width="161"
        height="160"
        viewBox="0 0 161 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="trapezoidMask">
            <rect width="161" height="160" fill="black" />
            <path
              d="M0 159.231L27.3357 0H161L133.664 159.231H0Z"
              fill="white"
            />
          </mask>
        </defs>
        <rect
          width="161"
          height="160"
          mask="url(#trapezoidMask)"
          fill="url(#imagePattern)"
        />
        <pattern
          id="imagePattern"
          patternUnits="userSpaceOnUse"
          width="161"
          height="160"
        >
          {/*
          <image
            className="judge-image"
            href={props.imgLink}
            x="0"
            y="0"
            width="161"
            height="160"
  />*/}
          <image
            className="judge-image"
            href={props.imgLink}
            x="0"
            y="0"
            width="161"
            height="160"
          />
        </pattern>
      </svg>
      <svg
        width="95"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 159.231L50 0H70L20 159.231H0Z" fill="#ff671e" />
      </svg>
      <div className="judge-info">
        <h3>Name: {props.name}</h3>
        <p>Pronouns: {props.pronouns}</p>
        <p>Position: {props.position}</p>
        <p>Fun Fact: {props.funFact}</p>
      </div>
    </div>
  );
};

export default JudgeComponent;
