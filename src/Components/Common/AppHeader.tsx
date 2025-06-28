import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../Constants/theme';
import {verticalScale} from '../../helper/scaleHelper';
import useAppNavigation from './useAppNavigation';

const AppHeader = () => {
  const navigation = useAppNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={['rgba(14, 65, 8, 0.05)', 'rgb(1, 21, 1)']}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.gradientBackground}>
      <View style={styles.topBar}>
        <Icon name="arrow-back" onPress={onBackPress} size={28} color="#fff" />
        <View style={styles.topBarIcons}>
          <Icon name="share" size={28} color="#fff" style={styles.iconMargin} />
          <Icon name="favorite-border" size={28} color="#fff" />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    paddingTop: verticalScale(theme.spacing.spacing_40),
    paddingHorizontal: 16,
    height: verticalScale(80),
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topBarIcons: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginRight: 16,
  },
});

export default AppHeader;
