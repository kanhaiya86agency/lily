// import React, {useEffect, useState} from 'react';
// import {View} from 'react-native';
// import LoginBottomSheet from '../Login/LoginBottomSheet';
// import useAppNavigation from '../Common/useAppNavigation';
// import {useIsFocused} from '@react-navigation/native';
// import {getToken} from '../../utils/tokenStorage';

// const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
//   const navigation = useAppNavigation();
//   const isFocused = useIsFocused();
//   const [localToken, setLocalToken] = useState<string | null>(null);

//   useEffect(() => {
//     const loadToken = async () => {
//       const token = await getToken();
//       setLocalToken(token);
//     };
//     loadToken();
//   }, [isFocused]);

//   console.log('🚀 ~ ProtectedRoute ~ token:', localToken);

//   const [showBottomSheet, setShowBottomSheet] = useState(false);

//   useEffect(() => {
//     if (isFocused && !localToken) {
//       setShowBottomSheet(true);
//     }
//   }, [isFocused, localToken]);

//   useEffect(() => {
//     if (!localToken && !showBottomSheet && isFocused) {
//       navigation.navigate('Home');
//     }
//   }, [showBottomSheet, localToken, isFocused, navigation]);

//   if (!localToken) {
//     return (
//       <View style={{flex: 1}}>
//         <LoginBottomSheet
//           isVisible={showBottomSheet}
//           hideBottomSheet={() => setShowBottomSheet(false)}
//         />
//       </View>
//     );
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import LoginBottomSheet from '../Login/LoginBottomSheet';
import useAppNavigation from '../Common/useAppNavigation';
import {useIsFocused} from '@react-navigation/native';
import {getToken} from '../../utils/tokenStorage';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  const navigation = useAppNavigation();
  const isFocused = useIsFocused();
  const [localToken, setLocalToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      const token = await getToken();
      setLocalToken(token);
      setLoading(false);
    };

    if (isFocused) {
      loadToken();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!loading && isFocused && !localToken) {
      setShowBottomSheet(true);
    }
  }, [loading, isFocused, localToken]);

  useEffect(() => {
    if (!loading && !localToken && !showBottomSheet && isFocused) {
      navigation.navigate('Home');
    }
  }, [loading, showBottomSheet, localToken, isFocused, navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!localToken) {
    return (
      <View style={{flex: 1}}>
        <LoginBottomSheet
          isVisible={showBottomSheet}
          hideBottomSheet={() => setShowBottomSheet(false)}
        />
      </View>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
