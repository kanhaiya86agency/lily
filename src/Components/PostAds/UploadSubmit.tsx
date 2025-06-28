import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Step4UploadSubmit = ({
  imageUri,
  pickImage,
}: {
  imageUri: '';
  pickImage: any;
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>Profile Image</Text>
    {imageUri ? (
      <Image source={{uri: imageUri}} style={styles.image} />
    ) : (
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        <Icon name="photo-camera" size={40} color="#999" />
        <Text style={{marginTop: 8, color: '#999'}}>Tap to upload image</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {padding: 10},
  label: {marginBottom: 10, fontWeight: '600', fontSize: 16},
  uploadBox: {
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});

export default Step4UploadSubmit;
