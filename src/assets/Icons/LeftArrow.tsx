import React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

export const LeftArrow = (props: SvgProps) => (
  <Svg width={32} height={32} viewBox="0, 0, 32, 32" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke={props.color || '#29CCAB'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 26 10 16 20 6"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M32 0v32H0V0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
