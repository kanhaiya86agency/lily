import {Pressable} from 'react-native';
import React from 'react';
import hitSlopRect from '../../Constants/hitsSlopRect';
import {LeftArrow} from '../../assets/Icons';
import useAppNavigation from './useAppNavigation';
import theme from '../../Constants/theme';

export const TestID_Navigation_Back_Button = 'TestID_Navigation_Back_Button';
export interface IBackButton {
  color?: string;
}

const NavigationBackButton = ({color = theme.colors.white}: IBackButton) => {
  const navigation = useAppNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={onBackPress} hitSlop={hitSlopRect}>
      <LeftArrow color={color} />
    </Pressable>
  );
};

export default NavigationBackButton;
