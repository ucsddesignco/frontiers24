import './CustomToolTip.scss';
import { PlacesType, Tooltip } from 'react-tooltip';

type CustomToolTipProps = {
  id: string;
  content: string;
  place: PlacesType;
  theme?: 'light' | 'dark' | '';
  offset?: number;
};

export default function CustomToolTip({
  id,
  content,
  place,
  theme = '',
  offset = 20 //10 is default
}: CustomToolTipProps) {
  return (
    <div className="tooltip-wrapper">
      {/* Styling only supports top, top-start and bottom placements */}
      <Tooltip
        key={id}
        id={id}
        className={`tooltip ${place} ${theme}`}
        place={place}
        content={content}
        offset={offset}
        float={true}
      />
    </div>
  );
}
