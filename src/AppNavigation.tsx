// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// // import Geolocation from '@react-native-community/geolocation';
// import {PermissionsAndroid, Platform} from 'react-native';
// import RootNavigation from './Screens';

// const AppNavigation = () => {
//   const [isLocationGranted, setIsLocationGranted] = useState(false);

//   const requestLocationPermission = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );
//         const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
//         setIsLocationGranted(isGranted);
//         return isGranted;
//       }
//       setIsLocationGranted(true);
//       return true;
//     } catch (err) {
//       console.warn(err);
//       setIsLocationGranted(false);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       await requestLocationPermission();
//     };
//     init();
//   }, []);

//   console.log('🚀 ~ AppNavigation ~ isLocationGranted:', isLocationGranted);
//   return (
//     <NavigationContainer>
//       <RootNavigation isLocationGranted={isLocationGranted} />
//     </NavigationContainer>
//   );
// };

// export default AppNavigation;

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PermissionsAndroid, Platform, AppState} from 'react-native';
import RootNavigation from './Screens';

const AppNavigation = () => {
  const [isLocationGranted, setIsLocationGranted] = useState(false);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
        setIsLocationGranted(isGranted);
        return isGranted;
      }
      setIsLocationGranted(true);
      return true;
    } catch (err) {
      console.warn(err);
      setIsLocationGranted(false);
      return false;
    }
  };

  const checkLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        setIsLocationGranted(result);
        return result;
      }
      // iOS implementation would go here
      return true;
    } catch (error) {
      console.error('Permission check error:', error);
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      await requestLocationPermission();
    };
    init();

    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'active') {
          await checkLocationPermission();
        }
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigation isLocationGranted={isLocationGranted} />
    </NavigationContainer>
  );
};

export default AppNavigation;



// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {PermissionsAndroid, Platform, AppState} from 'react-native';
// import RootNavigation from './Screens';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const PERMISSION_STORAGE_KEY = '@location_permission_granted';

// const AppNavigation = () => {
//   const [isLocationGranted, setIsLocationGranted] = useState(false);
//   const [isCheckingPermission, setIsCheckingPermission] = useState(true);

//   // Check if permission was previously granted
//   const checkStoredPermission = async () => {
//     try {
//       const value = await AsyncStorage.getItem(PERMISSION_STORAGE_KEY);
//       return value === 'true';
//     } catch (error) {
//       return false;
//     }
//   };

//   const requestLocationPermission = async () => {
//     try {
//       let granted = false;

//       if (Platform.OS === 'android') {
//         // First check current permission status
//         const hasPermission = await PermissionsAndroid.check(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );

//         if (hasPermission) {
//           await AsyncStorage.setItem(PERMISSION_STORAGE_KEY, 'true');
//           setIsLocationGranted(true);
//           return true;
//         }

//         // Only request if not already granted
//         const result = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );

//         granted = result === PermissionsAndroid.RESULTS.GRANTED;
//         if (granted) {
//           await AsyncStorage.setItem(PERMISSION_STORAGE_KEY, 'true');
//         }
//       } else {
//         // iOS implementation would go here
//         granted = true;
//       }

//       setIsLocationGranted(granted);
//       return granted;
//     } catch (err) {
//       console.warn(err);
//       setIsLocationGranted(false);
//       return false;
//     }
//   };

//   useEffect(() => {
//     const init = async () => {
//       // First check if we already have permission
//       const hasStoredPermission = await checkStoredPermission();

//       if (hasStoredPermission) {
//         setIsLocationGranted(true);
//         setIsCheckingPermission(false);
//         return;
//       }

//       // If no stored permission, request it
//       await requestLocationPermission();
//       setIsCheckingPermission(false);
//     };

//     init();

//     // Listen for app state changes
//     const subscription = AppState.addEventListener(
//       'change',
//       async nextAppState => {
//         if (nextAppState === 'active') {
//           // When app comes to foreground, verify permission status
//           await requestLocationPermission();
//         }
//       },
//     );

//     return () => subscription.remove();
//   }, []);

//   if (isCheckingPermission) {
//     // Show loading screen while checking permissions
//     return null; // or <LoadingScreen />
//   }

//   return (
//     <NavigationContainer>
//       <RootNavigation isLocationGranted={isLocationGranted} />
//     </NavigationContainer>
//   );
// };

// export default AppNavigation;
