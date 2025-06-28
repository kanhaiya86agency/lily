import React from 'react';
import {View, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import {useAppDispatch} from '../Hooks/hooks';
import {uploadImage} from '../../Redux/S3Images/uploadImagesThunk';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({onUploadComplete}) => {
  const dispatch = useAppDispatch();

  const pickImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (!asset.uri || !asset.type || !asset.fileName) {
          Alert.alert('Error', 'Incomplete image data');
          return;
        }

        try {
          const resultAction = await dispatch(
            uploadImage({
              uri: asset.uri,
              type: asset.type,
              fileName: asset.fileName,
            }),
          );

          if (uploadImage.fulfilled.match(resultAction)) {
            const uploadedUrl = resultAction.payload;
            console.log('🚀 ~ pickImage ~ uploadedUrl:', uploadedUrl);
            onUploadComplete(uploadedUrl);
          } else {
            const errorMsg =
              (resultAction.payload as string) || 'Upload failed';
            Alert.alert('Upload error', errorMsg);
          }
        } catch (error: any) {
          Alert.alert('Upload failed', error.message || 'Unknown error');
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Icon name="camera" size={40} color="#000" />
      </TouchableOpacity>
      <Text style={styles.text}>You Can Add Up To 20 Photos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: '#555',
    marginTop: 5,
  },
});

export default ImageUploader;
