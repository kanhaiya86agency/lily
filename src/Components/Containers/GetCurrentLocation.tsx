import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import LocationBottomSheet from '../Common/LocationBottomSheet';
import {requestLocationPermission} from '../../utils/locationPermission';
import {fetchCurrentLocation} from '../../Redux/Location/locationSlice';
import {useAppDispatch} from '../Hooks/hooks';

const GetCurrentLocation = () => {
  const [isVisibleLocation, setIsVisibleLocation] = useState(false);

  const dispatch = useAppDispatch();
  const handleUseCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Location permission is needed to continue. Please enable it in app settings.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return;
    }
    Geolocation.getCurrentPosition(info => {
      const lat = info.coords.latitude;
      const lon = info.coords.longitude;
      dispatch(fetchCurrentLocation({latitude: lat, longitude: lon}));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name="location-outline" size={60} color="#4A90E2" />
      </View>

      <Text style={styles.title}>Choose Your Location</Text>
      <Text style={styles.subtitle}>
        We need your location to show nearby service providers.
      </Text>

      <TouchableOpacity
        onPress={handleUseCurrentLocation}
        style={styles.buttonPrimary}>
        <Icon
          name="navigate"
          size={20}
          color="#fff"
          style={{marginRight: 10}}
        />
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        onPress={() => setIsVisibleLocation(true)}
        style={styles.buttonSecondary}>
        <Text style={styles.buttonSecondaryText}>Other Location</Text>
      </TouchableOpacity>
      <LocationBottomSheet
        isVisible={isVisibleLocation}
        hideBottomSheet={() => setIsVisibleLocation(false)}
      />
    </View>
  );
};

export default GetCurrentLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#E6F0FA',
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  buttonSecondary: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonSecondaryText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
