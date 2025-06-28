import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CrossedIcon = (props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M12 4l-8 8M4 4l8 8"
        stroke="#464646"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
