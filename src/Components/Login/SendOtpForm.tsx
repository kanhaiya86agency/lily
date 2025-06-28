import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../Hooks/hooks';
import {requestOtp, resetAuthState} from '../../Redux/OtpAuthSlice/authSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAppNavigation from '../Common/useAppNavigation';
import {VerifyOtpScreen} from '../../Screens';
import {verticalScale} from '../../helper/scaleHelper';
import Toast from 'react-native-toast-message';

const SendOtpForm = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigation = useAppNavigation();
  const dispatch = useDispatch();
  const {loading, success, error} = useAppSelector(state => state.otpVerify);

  const validatePhone = () => {
    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      setPhoneError('Phone number must contain only digits');
      return false;
    }
    if (phone.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSendOtp = async () => {
    if (validatePhone()) {
      const res = await dispatch(requestOtp('+91' + phone));
      const {payload, meta} = res;
      if (
        meta.requestStatus === 'fulfilled' &&
        payload?.statusCode === 200 &&
        payload?.subCode === 'SUCCESS'
      ) {
        navigation.navigate(VerifyOtpScreen, {
          phone: '+91' + phone,
        });
      }
      Toast.show({
        type: 'success',
        text1: 'Otp Sent Successfully',
        text2: res.payload?.message,
      });
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9f9f9'}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.title}>Enter your Phone Number</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={text => {
              setPhone(text);
              if (phoneError) {
                validatePhone();
              }
            }}
            placeholder="Enter your 10-digit phone number"
            keyboardType="phone-pad"
            style={[styles.input, phoneError && styles.inputError]}
            maxLength={12}
          />
          {phoneError ? (
            <Text style={styles.validationError}>{phoneError}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSendOtp}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>

          {success && (
            <Text style={styles.success}>✅ OTP sent successfully!</Text>
          )}
          {error && <Text style={styles.error}>❌ {error}</Text>}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendOtpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  box: {
    flex: 1,
    marginVertical: verticalScale(30),
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fdfdfd',
  },
  inputError: {
    borderColor: 'red',
  },
  validationError: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
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
