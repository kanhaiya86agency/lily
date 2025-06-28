// import * as React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {StyleSheet, Text} from 'react-native';

// import Home from './Components/Home/Home';
// import Login from './Components/Login/Login';
// import NavigationBackButton from './Components/Common/NavigationBackButton';
// import theme from './Constants/theme';
// import {horizontalScale, verticalScale} from './helper/scaleHelper';
// import Register from './Components/Login/Register';
// import ProductDetails from './Components/ProductDetails/ProductDetails';
// import {MyTabs} from './Components/BottomNavigationBar/BottomTabsNavigation';

// export const HomeScreen = 'Hire.HomeScreen';
// export const LoginRegisterScreen = 'Hire.LoginScreen';
// export const RegisterScreen = 'Hire.RegisterScreen';
// export const ProductDetailsScreen = 'Hire.ProductDetailsScreen';
// const AuthenticatedStack = () => {
//   const Stack = createNativeStackNavigator();

//   return (
//     <Stack.Navigator
//       initialRouteName={'mytabs'}
//       screenOptions={{
//         headerShadowVisible: false,
//         headerBackVisible: false,
//         orientation: 'portrait',
//         headerTitleAlign: 'center',
//         headerStyle: {
//           backgroundColor: theme.colors.BONIFY_GOLD,
//         },
//         headerTintColor: theme.colors.white,
//         headerTitle: (props: {children: string}) => (
//           <Text style={styles.headerTitle}>{props.children}</Text>
//         ),
//         animation: 'slide_from_right',
//       }}>
//       <Stack.Screen name={'mytabs'} component={MyTabs} />
//       <Stack.Screen
//         name={HomeScreen}
//         component={Home}
//         options={{
//           title: 'HomePage',
//           headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// const UnauthenticatedStack = () => {
//   const Stack = createNativeStackNavigator();

//   return (
//     <Stack.Navigator
//       initialRouteName={'mytabs'}
//       // screenOptions={{
//       //   orientation: 'portrait',
//       //   headerBackVisible: false,
//       //   headerTitleAlign: 'center',
//       //   headerShadowVisible: false,
//       // }}

//       screenOptions={{
//         headerShadowVisible: false,
//         headerBackVisible: false,
//         orientation: 'portrait',
//         headerTitleAlign: 'center',
//         headerStyle: {
//           backgroundColor: theme.colors.BONIFY_GOLD,
//         },
//         headerTintColor: theme.colors.white,
//         headerTitle: (props: {children: string}) => (
//           <Text style={styles.headerTitle}>{props.children}</Text>
//         ),
//         animation: 'slide_from_right',
//       }}>
//       <Stack.Screen
//         name={'mytabs'}
//         component={MyTabs}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name={LoginRegisterScreen}
//         component={Login}
//         options={{headerShown: false, statusBarStyle: 'dark'}}
//       />

//       <Stack.Screen
//         name={RegisterScreen}
//         component={Register}
//         options={{
//           title: 'Register',
//           headerLeft: () => <NavigationBackButton color={theme.colors.BLACK} />,
//           statusBarStyle: 'dark',
//         }}
//       />
//       <Stack.Screen
//         name={HomeScreen}
//         component={Home}
//         options={{
//           title: 'HomePage',
//           headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
//           headerStyle: {
//             backgroundColor: theme.colors.BONIFY_GOLD,
//           },
//           headerTintColor: theme.colors.white,
//           headerTitle: (props: {children: string}) => (
//             <Text style={styles.headerTitle}>{props.children}</Text>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name={ProductDetailsScreen}
//         component={ProductDetails}
//         options={{
//           title: 'Product Details',
//           headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
//           headerStyle: {
//             backgroundColor: theme.colors.BONIFY_GOLD,
//           },
//           headerTintColor: theme.colors.white,
//           headerTitle: (props: {children: string}) => (
//             <Text style={styles.headerTitle}>{props.children}</Text>
//           ),
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// interface RootNavigationProps {
//   isLoggedIn: boolean;
// }

// const RootNavigation = ({isLoggedIn = false}: RootNavigationProps) => {
//   return isLoggedIn ? <AuthenticatedStack /> : <UnauthenticatedStack />;
// };

// export default RootNavigation;

// const styles = StyleSheet.create({
//   headerTitle: {
//     color: theme.colors.white,
//     fontSize: horizontalScale(theme.fontSize.fontSize_16),
//     textAlign: 'center',
//   },
//   headerLeftContainer: {
//     left: horizontalScale(theme.spacing.spacing_24),
//     alignSelf: 'center',
//     height: '100%',
//     justifyContent: 'center',
//     zIndex: 999,
//   },
//   tabBar: {
//     height: verticalScale(theme.spacing.spacing_80),
//   },
//   tabBarLabel: {
//     fontSize: horizontalScale(theme.fontSize.fontSize_12),
//     fontWeight: theme.fontWeight.fontWeight_500,
//   },
//   logoStyles: {
//     width: horizontalScale(theme.spacing.spacing_76),
//     height: horizontalScale(theme.spacing.spacing_25),
//   },
// });

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text} from 'react-native';
import Login from './Components/Login/Login';
import NavigationBackButton from './Components/Common/NavigationBackButton';
import theme from './Constants/theme';
import Register from './Components/Login/Register';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import {MyTabs} from './Components/BottomNavigationBar/BottomTabsNavigation';
import Chats from './Components/Chats/Chats';
import {horizontalScale, verticalScale} from './helper/scaleHelper';
import Language from './Components/Language/Language';
import EditProfile from './Components/Profile/EditProfile';
import ProtectedRoute from './Components/Hooks/ProtectedScreen';
import HomeScreen from './Components/Home/HomeScreen';
import GetCurrentLocation from './Components/Containers/GetCurrentLocation';
import ChangePassword from './Components/Containers/ChangePassword';
// import Notification from './Components/Containers/Notification';
import LoginNew from './Components/Login/LoginNew';
import SinglePage from './Components/SinglePage/SinglePage';
import AllServicesList from './Components/AllServicesList/AllServicesList';
import Notifications from './Components/Notifications/Notification';
import Feedback from './Components/Common/FeedbackScreen';
import ServiceForm from './Components/ServiceProviderForm/FullServiceForm';
import AllCetegoryList from './Components/Home/AllCetegoryList';
import ViewProfile from './Components/Profile/ViewProfile';
import GetLocation from './Components/Common/GetLocation';
import VerifyOtp from './Components/Login/VerifyOtp';
import SendOtpForm from './Components/Login/SendOtpForm';

export const HomePageScreen = 'Riri.HomePageScreen';
export const LoginRegisterScreen = 'Riri.LoginScreen';
export const RegisterScreen = 'Riri.RegisterScreen';
export const ProductDetailsScreen = 'Riri.ProductDetailsScreen';
export const ChatsScreen = 'Riri.ChatsScreen';
export const LanguageScreen = 'Riri.Language';
export const EditProfileScreen = 'Riri.EditProfileScreen';
export const LoginTemplateScreen = 'Riri.LoginTemplateScreen';
export const GetCurrentLocationScreen = 'Riri.GetCurrentLocationScreen';
export const ChangePasswordScreen = 'Riri.ChangePasswordScreen';
export const NotificationScreen = 'Riri.NotificationScreen';
export const FeedbackScreen = 'Riri.FeedbackScreen';
export const AllCetegoryListScreen = 'Riri.AllCetegoryListScreen';
export const ViewProfileScreen = 'Riri.ViewProfileScreen';
export const SendOtpFormScreen = 'Riri.SendOtpFormScreen';
export const VerifyOtpScreen = 'Riri.VerifyOtpScreen';

const UnauthenticatedStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'mytabs'}
      screenOptions={{
        animation: 'slide_from_right',
        statusBarStyle: 'dark',
        headerTintColor: theme.colors.white,
        statusBarBackgroundColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}>
      <Stack.Screen
        name={'mytabs'}
        component={MyTabs}
        options={{
          statusBarBackgroundColor: theme.colors.primary,
          headerShown: false,
          statusBarStyle: 'dark',
        }}
      />
      <Stack.Screen
        name={LoginRegisterScreen}
        component={Login}
        options={{headerShown: false, statusBarStyle: 'dark'}}
      />

      <Stack.Screen
        name={SendOtpFormScreen}
        component={SendOtpForm}
        options={{
          headerShown: true,
          statusBarStyle: 'light',
          title: '',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />

      <Stack.Screen
        name={VerifyOtpScreen}
        component={VerifyOtp}
        options={{
          headerShown: true,
          statusBarStyle: 'light',
          title: '',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />

      <Stack.Screen
        name={'Login'}
        component={LoginNew}
        options={{headerShown: false, statusBarStyle: 'dark'}}
      />

      <Stack.Screen
        name={HomePageScreen}
        component={HomeScreen}
        options={{headerShown: false, statusBarStyle: 'dark'}}
      />
      <Stack.Screen
        name={'productSingle'}
        component={SinglePage}
        options={{
          statusBarStyle: 'inverted',
          headerShown: true,
          headerTitle: 'Details',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />
      <Stack.Screen
        name={'AllServicesListScreen'}
        component={AllServicesList}
        options={{
          statusBarStyle: 'dark',
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />

      <Stack.Screen
        name={RegisterScreen}
        component={Register}
        options={{
          title: 'Register',
          headerShown: false,
          headerLeft: () => <NavigationBackButton color={theme.colors.black} />,
          statusBarStyle: 'dark',
          headerTitle: (props: {children: string}) => (
            <Text style={styles.headerTitle}>{props.children}</Text>
          ),
        }}
      />
      <Stack.Screen
        name={ProductDetailsScreen}
        component={ProductDetails}
        options={{
          title: 'Details',
          headerShown: false,
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          headerTintColor: theme.colors.white,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      />

      <Stack.Screen
        name={ChatsScreen}
        component={() => (
          <ProtectedRoute>
            <Chats />
          </ProtectedRoute>
        )}
        options={{
          headerShown: false,
          title: 'Chats',
          // headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          headerTintColor: theme.colors.white,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={LanguageScreen}
        component={Language}
        options={{
          title: 'Select language/भाषा चुने',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitle: (props: {children: string}) => (
            <Text style={styles.headerTitle}>{props.children}</Text>
          ),
        }}
      />
      <Stack.Screen
        name={EditProfileScreen}
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={ChangePasswordScreen}
        component={ChangePassword}
        options={{
          title: 'Change password',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name={NotificationScreen}
        component={Notifications}
        options={{
          title: 'Notifications',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name={FeedbackScreen}
        component={Feedback}
        options={{
          title: 'Notifications',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={ViewProfileScreen}
        component={ViewProfile}
        options={{
          title: 'My Profile',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={AllCetegoryListScreen}
        component={AllCetegoryList}
        options={{
          title: 'AllCetegoryList',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={'ServiceAddForm'}
        component={ServiceForm}
        options={{
          title: 'My Ad',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={'GetLocationScreen'}
        component={GetLocation}
        options={{
          headerShown: false,
          title: '',
          headerLeft: () => <NavigationBackButton color={theme.colors.white} />,
          statusBarStyle: 'light',
          statusBarBackgroundColor: theme.colors.primary,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={GetCurrentLocationScreen}
      screenOptions={{
        animation: 'slide_from_right',
        statusBarStyle: 'dark',
        headerTintColor: theme.colors.white,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}>
      <Stack.Screen
        name={GetCurrentLocationScreen}
        component={GetCurrentLocation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = ({isLocationGranted}: any) => {
  return !isLocationGranted ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};

export default RootNavigation;

const styles = StyleSheet.create({
  headerTitle: {
    color: theme.colors.white,
    fontSize: horizontalScale(theme.fontSize.fontSize_16),
    textAlign: 'center',
  },
  headerLeftContainer: {
    left: horizontalScale(theme.spacing.spacing_24),
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',
    zIndex: 999,
  },
  tabBar: {
    height: verticalScale(theme.spacing.spacing_80),
  },
  tabBarLabel: {
    fontSize: horizontalScale(theme.fontSize.fontSize_12),
    fontWeight: theme.fontWeight.fontWeight_500,
  },
  logoStyles: {
    width: horizontalScale(theme.spacing.spacing_76),
    height: horizontalScale(theme.spacing.spacing_25),
  },
});
