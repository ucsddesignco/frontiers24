import { JudgeInfo } from '../../pages/Judges/JudgeInfo';
import { Tooltip } from 'react-tooltip';
import './JudgeFunFacts.scss';

export default function JudgeFunFacts() {
  return (
    <div className="judge-fun-facts">
      {JudgeInfo.map(item => (
        <Tooltip
          key={`${item.name}-tooltip`}
          id={`${item.name}-tooltip`}
          className="tooltip"
        />
      ))}
    </div>
  );
}
