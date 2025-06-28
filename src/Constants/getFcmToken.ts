import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(); // Get the token
  }
};

export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
      // Save this token to your backend if needed
    } else {
      console.log('Failed to get FCM token');
    }
  } catch (error) {
    console.log('Error in FCM token:', error);
  }
};
