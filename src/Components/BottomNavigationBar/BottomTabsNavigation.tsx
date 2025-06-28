// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import theme from '../../Constants/theme';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import HomeScreen from '../Home/HomeScreen';
// import {verticalScale} from '../../helper/scaleHelper';
// import {
//   ProtectedChats,
//   ProtectedPostAds,
//   ProtectedProfile,
// } from '../Common/ProtectedScreen';
// import Dashboard from '../Home/Dashboard';

// const Tab = createBottomTabNavigator();

// export function MyTabs() {
//   return (
//     <>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarActiveTintColor: theme.colors.primary,

//           headerTitleAlign: 'center',
//           tabBarIcon: ({color, size}) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = 'home';
//             } else if (route.name === 'ChatsUserList') {
//               iconName = 'chat-bubble-outline';
//             } else if (route.name === 'ServiceProviderFormScreen') {
//               iconName = 'adsense';
//             } else if (route.name === 'ProfileScreen') {
//               iconName = 'person';
//             }
//             return <Icon name={iconName} size={size} color={color} />;
//           },
//         })}>
//         <Tab.Screen
//           name="Home"
//           component={Dashboard}
//           options={{
//             title: 'Home',
//             headerShown: true,
//             headerTitle: '',
//             headerStyle: {
//               height: verticalScale(theme.spacing.spacing_50),
//               backgroundColor: theme.colors.primary,
//             },
//           }}
//         />
//         <Tab.Screen
//           name={'ChatsUserList'}
//           component={ProtectedChats}
//           options={{
//             title: 'Chats',
//             headerTitle: 'User list',
//             headerShown: true,
//             headerTitleAlign: 'center',
//             headerTintColor: theme.colors.white,
//             headerStyle: {
//               backgroundColor: theme.colors.primary,
//             },
//           }}
//         />
//         <Tab.Screen
//           name={'ServiceProviderFormScreen'}
//           component={ProtectedPostAds}
//           options={{
//             title: 'Post Ads',
//             headerShown: true,
//             headerTitle: 'Post Ads',
//             headerTitleAlign: 'center',
//             headerTintColor: theme.colors.white,
//             headerStyle: {
//               backgroundColor: theme.colors.primary,
//             },
//           }}
//         />
//         <Tab.Screen
//           name={'ProfileScreen'}
//           component={ProtectedProfile}
//           options={{
//             title: 'Profile',
//             headerShown: true,
//             headerStyle: {
//               height: 50,
//               backgroundColor: theme.colors.primary,
//             },
//           }}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../Constants/theme';
import {verticalScale} from '../../helper/scaleHelper';

import {
  ProtectedChats,
  ProtectedPostAds,
  ProtectedProfile,
} from '../Common/ProtectedScreen';
import Dashboard from '../Home/Dashboard';
import {PlusIcon} from '../../assets/Icons/Svg';
import MyServices from '../MyAds/MyServices';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({onPress}: any) => (
  <TouchableOpacity
    style={styles.floatingButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}>
    <View style={styles.floatingButton}>
      <PlusIcon />
    </View>
  </TouchableOpacity>
);

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colors.SecondaryRed,
        headerTitleAlign: 'center',
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'ChatsUserList') {
            iconName = 'chat-bubble-outline';
          } else if (route.name === 'ServiceProviderFormScreen') {
            iconName = <PlusIcon />;
          } else if (route.name === 'MyServices') {
            iconName = 'favorite';
          } else if (route.name === 'ProfileScreen') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          title: 'Home',
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            height: verticalScale(theme.spacing.spacing_50),
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Tab.Screen
        name="ChatsUserList"
        component={ProtectedChats}
        options={{
          title: 'Chats',
          headerTitle: 'Chats list',
          headerShown: true,
          headerTintColor: theme.colors.white,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Tab.Screen
        name="ServiceProviderFormScreen"
        component={ProtectedPostAds}
        options={{
          title: '',
          tabBarButton: props => <CustomTabBarButton {...props} />,
          headerShown: true,
          headerTitle: 'Post Ad',
          headerTitleAlign: 'center',
          headerTintColor: theme.colors.SecondaryRed,
          headerStyle: {
            backgroundColor: theme.colors.white,
          },
        }}
      />
      <Tab.Screen
        name="MyServices"
        component={MyServices}
        options={{
          title: 'My Ads',
          headerTitle: '',
          headerShown: false,
          headerTintColor: theme.colors.white,

          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomColor: theme.colors.primary,
            borderWidth: 0,
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProtectedProfile}
        options={{
          title: 'Profile',
          headerShown: true,
          headerTintColor: theme.colors.white,
          headerStyle: {
            height: 50,
            backgroundColor: theme.colors.primary,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    elevation: 0,
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  floatingButtonContainer: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: theme.colors.SecondaryRed,
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: theme.colors.SecondaryRed,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // Shadow for Android
    elevation: 10,
  },
});
