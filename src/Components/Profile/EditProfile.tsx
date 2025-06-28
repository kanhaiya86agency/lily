import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TextInput, Button, Avatar, Chip} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {fetchUserProfile, updateUserProfile} from '../../Redux/User/UserThunk';
import {UserProfileType} from '../../Redux/User/userType';
import {uploadImage} from '../../Redux/S3Images/uploadImagesThunk';
import Toast from 'react-native-toast-message';
import useAppNavigation from '../Common/useAppNavigation';
import theme from '../../Constants/theme';
import {AppText} from '../Common/AppText';
import * as ImagePicker from 'react-native-image-picker';
import DebouncedSearchInput from '../Common/DebouncedSearchInput';
import {
  fetchAutocomplete,
  fetchCoordinates,
} from '../../Redux/Places/placesThunk';

type RootStackParamList = {
  UserProfileScreen: {userData: UserProfileType};
};

const ALL_LANGUAGES = ['HINDI', 'ENGLISH', 'ASSAMESE', 'BENGALI', 'GUJARATI'];

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'UserProfileScreen'>>();
  const {userData} = route.params;
  const [locate, setLocate] = useState('');

  const [formData, setFormData] = useState<UserProfileType>({
    firstName: '',
    lastName: '',
    location: '',
    latitude: 0,
    longitude: 0,
    profileImage: '',
    phone: '',
    email: '',
    experience: 0,
    languages: [],
    deviceToken: '',
  });

  const loading = useAppSelector(state => state.user.loading);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        ...userData,
        languages: userData.languages || [],
      });
      if (userData.location) {
        setLocate(userData.location);
      }
    }
  }, [userData]);

  const handleChange = <K extends keyof UserProfileType>(
    key: K,
    value: UserProfileType[K],
  ) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const toggleLanguage = (lang: string) => {
    const updated = formData.languages.includes(lang)
      ? formData.languages.filter(l => l !== lang)
      : [...formData.languages, lang];
    handleChange('languages', updated);
  };

  const handleSave = async () => {
    const res = await dispatch(updateUserProfile(formData));
    if (updateUserProfile.fulfilled.match(res)) {
      Toast.show({
        type: 'success',
        text1: res.payload.message,
        position: 'top',
      });
      navigation.goBack();
      dispatch(fetchUserProfile());
    } else {
      Toast.show({
        type: 'error',
        text1: res.payload as string,
        position: 'top',
      });
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage ?? 'Unknown error');
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
            Toast.show({
              type: 'success',
              text1: 'Image uploaded successfully!',
              position: 'top',
            });
            setFormData(prev => ({
              ...prev,
              profileImage: uploadedUrl,
            }));
          } else {
            const errorMsg =
              (resultAction.payload as string) || 'Upload failed';
            Alert.alert('Upload error', errorMsg);
          }
        } catch (error: any) {
          Alert.alert('Upload failed', error.message ?? 'Unknown error');
        }
      }
    });
  };

  const handleSelectLocation = async (item: any) => {
    try {
      const result = await dispatch(fetchCoordinates(item.place_id)).unwrap();

      setLocate(
        item?.structured_formatting?.main_text ?? item?.description ?? '',
      );
      setFormData(prev => ({
        ...prev,
        location: result.address,
        longitude: result.longitude,
        latitude: result.latitude,
      }));
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to get coordinates',
        position: 'top',
      });
    }
  };

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.white}]}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        <View>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={100}
              source={{
                uri:
                  formData.profileImage || 'https://i.pravatar.cc/150?img=12',
              }}
            />
            <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
              <MaterialIcons name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* <AppText style={styles.title}>Edit Profile</AppText> */}

          <TextInput
            label="First Name"
            mode="flat"
            value={formData.firstName}
            underlineColor={theme.colors.primary}
            onChangeText={text => handleChange('firstName', text)}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={formData.lastName}
            onChangeText={text => handleChange('lastName', text)}
            underlineColor={theme.colors.primary}
            mode="flat"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            mode="flat"
            underlineColor={theme.colors.primary}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Phone"
            value={formData.phone}
            onChangeText={text => handleChange('phone', text)}
            mode="flat"
            underlineColor={theme.colors.primary}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <DebouncedSearchInput
            label="Location"
            value={locate}
            onChange={setLocate}
            onSelect={handleSelectLocation}
            dispatchAction={fetchAutocomplete}
            selector={state => state.places.autocompleteResults}
          />
          <TextInput
            label="Experience (Years)"
            value={String(formData.experience)}
            onChangeText={text => handleChange('experience', Number(text))}
            mode="flat"
            underlineColor={theme.colors.primary}
            keyboardType="numeric"
            style={styles.input}
          />

          <AppText style={styles.sectionTitle}>Languages</AppText>
          <View style={styles.chipContainer}>
            {ALL_LANGUAGES.map(lang => (
              <Chip
                key={lang}
                mode="flat"
                selected={formData.languages.includes(lang)}
                onPress={() => toggleLanguage(lang)}
                style={styles.chip}>
                {lang}
              </Chip>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            contentStyle={{paddingVertical: 8}}
            disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : 'Save Changes'}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: theme.colors.primary,
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: theme.colors.SecondaryRed,
  },
});
