import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  onGrantPermission: () => void;
};

const LocationPermissionScreen = ({onGrantPermission}: Props) => {
  return (
    <View style={styles.container}>
      <Icon name="location-outline" size={60} color="#4A90E2" />
      <Text style={styles.title}>Enable Location</Text>
      <Text style={styles.subtitle}>
        We need your location to show nearby services.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onGrantPermission}>
        <Text style={styles.buttonText}>Allow Location Access</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
