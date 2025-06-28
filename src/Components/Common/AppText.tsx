import React from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import theme from '../../Constants/theme';

interface AppTextProps {
  children: React.ReactNode;
  textType?: 'medium' | 'light' | 'regular';
  style?: TextStyle | TextStyle[];
  textProps?: TextProps;
  numberOfLines?: number;
  ellipsizeMode?: 'tail' | '';
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  textType = 'regular',
  style,
  textProps,
  numberOfLines,
  ellipsizeMode,
}) => {
  let textStyle: object;
  switch (textType) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'light':
      textStyle = styles.light;
      break;
    case 'medium':
      textStyle = styles.medium;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[styles.basicStyles, textStyle, {...passedStyles}]}
      {...textProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  basicStyles: {
    color: theme.colors.black,
  },
  light: {
    fontFamily: theme.fontFamily.bodyFont,
  },
  medium: {
    fontFamily: theme.fontFamily.headerMediumFont,
  },
  regular: {
    fontFamily: theme.fontFamily.headerFont,
  },
});
