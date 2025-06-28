import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../Constants/theme';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import useAppNavigation from './useAppNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';

const AppHeaderIos = () => {
  const navigation = useAppNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['rgba(20, 93, 12, 0)', 'rgb(1, 53, 15)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.gradientBackground}>
        <View style={styles.topBar}>
          <Icon
            name="arrow-back"
            onPress={onBackPress}
            size={28}
            color="#fff"
          />
          <View style={styles.topBarIcons}>
            <Icon
              name="share"
              size={28}
              color="#fff"
              style={styles.iconMargin}
            />
            <Icon name="favorite-border" size={28} color="#fff" />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  gradientBackground: {
    height: verticalScale(theme.spacing.spacing_100),
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: horizontalScale(theme.spacing.spacing_10),
  },
  topBarIcons: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginRight: horizontalScale(theme.spacing.spacing_16),
  },
});

export default AppHeaderIos;
