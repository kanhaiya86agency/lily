import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import AppLogo from '../../assets/Icons/AppLogo';
import useAppNavigation from '../Common/useAppNavigation';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {signupUser} from '../../Redux/AuthSlice/authThunks';
import {AppText} from '../Common/AppText';
import Toast from 'react-native-toast-message';
import {ImageBackground} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LogoIcon} from '../../assets/Icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [showOld, setShowOld] = useState(false);

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth);

  const handleRegister = async () => {
    if (!firstName || !lastName || !contact || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    let userPayload: any = {
      firstName,
      lastName,
      password,
    };

    const isPhone = /^\d{10}$/.test(contact);

    if (isPhone) {
      userPayload.phone = `+91${contact}`;
    } else {
      userPayload.email = contact;
    }

    const resultAction = await dispatch(signupUser(userPayload));

    if (signupUser.fulfilled.match(resultAction)) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully 🎉',
        position: 'bottom',
      });
      navigation.navigate('mytabs');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: resultAction.payload as string,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={require('../../assets/Images/LoginBg.png')}
        style={styles.topBackground}
        resizeMode="cover">
        <View style={styles.logoContainer}>
          <AppLogo />
        </View>
      </ImageBackground> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <LogoIcon />
          </View>

          <View style={styles.formContainer}>
            {/* <Text style={styles.title}>Register</Text> */}

            <TextInput
              underlineColor={theme.colors.primary}
              mode="flat"
              label="First name"
              style={styles.input}
              placeholder=" First name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#aaa"
            />
            <TextInput
              underlineColor={theme.colors.primary}
              mode="flat"
              label="Last name"
              style={styles.input}
              placeholder=" Last name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#aaa"
            />
            <TextInput
              underlineColor={theme.colors.primary}
              mode="flat"
              style={styles.input}
              label="Email or Phone"
              placeholder="Email or Phone"
              value={contact}
              onChangeText={setContact}
              placeholderTextColor="#aaa"
              keyboardType="default"
              autoCapitalize="none"
            />

            <TextInput
              underlineColor={theme.colors.primary}
              mode="flat"
              label="Password"
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#aaa"
              secureTextEntry={!showOld}
              right={
                <TextInput.Icon
                  icon={showOld ? 'eye-off' : 'eye'}
                  onPress={() => setShowOld(prev => !prev)}
                />
              }
            />

            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            )}
            {error && !loading && (
              <AppText style={styles.errorText}>{error}</AppText>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.infoBackground,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
  },
  topBackground: {
    height: verticalScale(300),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  formContainer: {
    alignItems: 'center',
    marginTop: verticalScale(32),
  },
  title: {
    fontSize: horizontalScale(28),
    fontWeight: 'bold',
    marginBottom: verticalScale(32),
    color: theme.colors.TextColor,
  },
  input: {
    width: '100%',
    height: verticalScale(48),
    borderRadius: 8,
    paddingHorizontal: horizontalScale(12),
    marginBottom: verticalScale(16),
    fontSize: horizontalScale(16),
    color: '#000',
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: theme.colors.SecondaryRed,
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  buttonText: {
    color: '#fff',
    fontSize: horizontalScale(16),
    fontWeight: '600',
  },
});

export default Register;
