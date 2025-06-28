import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {resetAuthState, verifyOtp} from '../../Redux/OtpAuthSlice/authSlice';
import {useRoute} from '@react-navigation/native';
import theme from '../../Constants/theme';
import {verticalScale} from '../../helper/scaleHelper';
import Toast from 'react-native-toast-message';
import useAppNavigation from '../Common/useAppNavigation';

const VerifyOtp = () => {
  const route = useRoute();

  const passedPhone = route.params?.phone ?? '';

  const [formData, setFormData] = useState({
    phone: passedPhone,
    otp: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const {loading, verificationSuccess, verificationError} = useAppSelector(
    state => state.otpVerify,
  );

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const handleVerify = async () => {
    const res = await dispatch(verifyOtp(formData));

    if (verifyOtp.fulfilled.match(res)) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: res.payload?.message ?? 'You are now logged in.',
      });
      navigation.navigate('mytabs');
    } else if (verifyOtp.rejected.match(res)) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (
        res.payload &&
        typeof res.payload === 'object' &&
        'message' in res.payload
      ) {
        errorMessage = res.payload.message as string;
      } else if (res.error && res.error.message) {
        errorMessage = res.error.message;
      }
      Toast.show({
        type: 'error',
        text1: 'OTP Verification Failed',
        text2: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (verificationSuccess || verificationError) {
      const timeout = setTimeout(() => {
        dispatch(resetAuthState());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [verificationSuccess, verificationError, dispatch]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>🔐 Verify OTP</Text>

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={formData.phone}
            editable={false}
            style={[styles.input, styles.disabledInput]}
          />

          <Text style={styles.label}>OTP</Text>
          <TextInput
            value={formData.otp}
            onChangeText={text => handleChange('otp', text)}
            placeholder="OTP"
            keyboardType="number-pad"
            style={styles.input}
            maxLength={6}
          />

          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={formData.firstName}
            onChangeText={text => handleChange('firstName', text)}
            placeholder="First Name"
            style={styles.input}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={formData.lastName}
            onChangeText={text => handleChange('lastName', text)}
            placeholder="Last Name"
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleVerify}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          {verificationSuccess && (
            <Text style={styles.success}>✅ OTP verified successfully!</Text>
          )}
          {verificationError && (
            <Text style={styles.error}>
              {typeof verificationError === 'object'
                ? verificationError.message
                : verificationError}
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: 'center',
    paddingVertical: verticalScale(32),
    paddingHorizontal: 24,
  },
  box: {
    // padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fdfdfd',
  },
  disabledInput: {
    backgroundColor: '#e9ecef',
    color: '#888',
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  success: {
    color: 'green',
    marginTop: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
