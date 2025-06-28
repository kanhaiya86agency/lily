import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

type Coords = {
  latitude: number;
  longitude: number;
};

export const useCurrentLocation = () => {
  const [currentCoords, setCurrentCoords] = useState<Coords | null>(null);

  useEffect(() => {
    const requestPermissionAndFetchLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Location permission denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log(
            '🚀 ~ requestPermissionAndFetchLocation ~ latitude:',
            latitude,
          );
          setCurrentCoords({latitude, longitude});
        },
        error => {
          console.error('Error getting location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestPermissionAndFetchLocation();
  }, []);

  return currentCoords;
};
