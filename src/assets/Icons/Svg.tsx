import * as React from 'react';
import Svg, {
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
  Path,
  G,
} from 'react-native-svg';

export const SeeAllIcon = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Rect width={16} height={16} rx={3} fill="#FF8951" />
    <Path
      d="M7 11L11 7.5L7 4"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlusIcon = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 18 18" fill="none" {...props}>
    <Path
      d="M16.5035 7.52617H10.4965V1.47378C10.4965 0.659864 9.82648 0 9 0C8.17352 0 7.50347 0.659864 7.50347 1.47378V7.52617H1.49653C0.670051 7.52617 0 8.18604 0 8.99996C0 9.81387 0.670051 10.4737 1.49653 10.4737H7.50347V16.5262C7.50347 17.3401 8.17352 18 9 18C9.82648 18 10.4965 17.3401 10.4965 16.5262V10.4737H16.5035C17.3299 10.4737 18 9.81387 18 8.99996C17.9999 8.18604 17.3299 7.52617 16.5035 7.52617Z"
      fill="white"
    />
  </Svg>
);
