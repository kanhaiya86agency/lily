import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Central + Button
          if (route.name === 'PostAdCenterButton') {
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.centerButtonContainer}>
                <View style={styles.plusButton}>
                  <Icon name="add" size={32} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          }

          // Tab icons
          let iconName = '';
          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'ChatsUserList') iconName = 'chat-bubble-outline';
          if (route.name === 'Favorites') iconName = 'favorite-border';
          if (route.name === 'ProfileScreen') iconName = 'person';

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabButton}>
              <Icon
                name={iconName}
                size={24}
                color={isFocused ? '#ff2d55' : '#4f4f4f'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#1e1e1e', // Dark background
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonContainer: {
    position: 'absolute',
    top: -30,
    left: width / 2 - 35,
    zIndex: 10,
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff2d55',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff2d55',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default CustomTabBar;
