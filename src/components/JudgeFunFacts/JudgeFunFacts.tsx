import { JudgeInfo } from '../../pages/Judges/JudgeInfo';
import './JudgeFunFacts.scss';
import CustomToolTip from '../CustomToolTIp/CustomToolTip';

export default function JudgeFunFacts() {
  return (
    <div className="judge-fun-facts">
      {JudgeInfo.map(item => (
        <CustomToolTip
          key={`${item.name}-tooltip`}
          id={`${item.name}-tooltip`}
          content={item.funFact}
          place="bottom"
        />
      ))}
    </div>
  );
}
