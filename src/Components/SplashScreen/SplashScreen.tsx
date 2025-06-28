// import React, {useEffect, useRef} from 'react';
// import {Animated, Text, StyleSheet, Image} from 'react-native';
// import theme from '../../Constants/theme';

// const SplashScreen = ({onFinish}: {onFinish: () => void}) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.delay(1000),
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start(onFinish);
//   }, [fadeAnim, onFinish]);

//   return (
//     <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
//       <Image
//         source={require('https://static1.squarespace.com/static/6366705b69d9695fc1f29f7c/t/65960094fe6bbe3e3a89c114/1704329364889/Riri_Logo_FullLockup_Black.png?format=1500w')}
//         style={styles.logo}
//         resizeMode="contain"
//       />
//       <Text style={styles.tagline}>Your trusted app tagline</Text>
//     </Animated.View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.WHITE,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 180,
//     height: 180,
//     marginBottom: 20,
//   },
//   tagline: {
//     fontSize: 18,
//     color: theme.colors.AMARANTH,
//     fontWeight: '600',
//   },
// });

import {View, Text} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
