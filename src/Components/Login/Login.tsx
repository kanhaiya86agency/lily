import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';
import {RegisterScreen} from '../../Screens';
import useAppNavigation from '../Common/useAppNavigation';
import AppLogo from '../../assets/Icons/AppLogo';
import {useIntl} from 'react-intl';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {loginUser} from '../../Redux/AuthSlice/authThunks';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {TextInput} from 'react-native-paper';
import {LogoIcon} from '../../assets/Icons';

const Login = () => {
  const navigation = useAppNavigation();
  const intl = useIntl();
  const [showOld, setShowOld] = useState(false);
  const dispatch = useAppDispatch();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const {loading, error} = useAppSelector(state => state.auth);

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter email/phone and password',
      });
      return;
    }

    const isEmail = identifier.includes('@');
    const payload = {
      email: isEmail ? identifier.trim() : '',
      phone: !isEmail ? `+91${identifier.trim()}` : '',
      password,
    };

    const resultAction = await dispatch(loginUser(payload));
    console.log('🚀 ~ handleLogin ~ resultAction:', resultAction);

    if (loginUser.fulfilled.match(resultAction)) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        position: 'bottom',
      });
      navigation.navigate('mytabs');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: resultAction.payload as string,
      });
    }
  };

  const isFormValid = identifier.trim() && password.trim();

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
          {/* 
          <Text style={{textAlign: 'center', marginTop: -30, marginBottom: 30}}>
            Wellcome to FirKo */}
          {/* </Text> */}

          <View style={styles.formContainer}>
            {/* <Text style={styles.title}>
              {intl.formatMessage({id: 'login.title'})}
            </Text> */}

            <TextInput
              style={styles.input}
              label="Email or Phone Number"
              placeholder="Email or Phone Number"
              placeholderTextColor="#aaa"
              value={identifier}
              onChangeText={setIdentifier}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColor={theme.colors.primary}
              mode="flat"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              label="Password"
              underlineColor={theme.colors.primary}
              mode="flat"
              placeholderTextColor="#aaa"
              value={password}
              secureTextEntry={!showOld}
              onChangeText={setPassword}
              right={
                <TextInput.Icon
                  icon={showOld ? 'eye-off' : 'eye'}
                  onPress={() => setShowOld(prev => !prev)}
                />
              }
            />

            {loading ? (
              <ActivityIndicator size="large" color={theme.colors.TextColor} />
            ) : (
              <TouchableOpacity
                style={[styles.button, !isFormValid && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={!isFormValid}>
                <Text style={styles.buttonText}>
                  {intl.formatMessage({id: 'login.title'})}
                </Text>
              </TouchableOpacity>
            )}

            {error && !loading && (
              <Text style={{color: 'red', marginTop: 10}}>{error}</Text>
            )}

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                {intl.formatMessage({id: 'login.new.register.title'})}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(RegisterScreen)}>
                <Text style={styles.registerLink}>
                  {intl.formatMessage({id: 'login.new.register.button'})}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white || '#fff',
    justifyContent: 'center',
  },
  topBackground: {
    height: verticalScale(300),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(theme.spacing.spacing_10),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(74),
  },
  formContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: horizontalScale(28),
    fontWeight: 'bold',
    color: theme.colors.TextColor,
    marginBottom: verticalScale(24),
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
    marginTop: verticalScale(8),
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: horizontalScale(16),
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
  },
  registerText: {
    fontSize: horizontalScale(14),
    color: '#333',
  },
  registerLink: {
    fontSize: horizontalScale(14),
    color: theme.colors.TextColor,
    fontWeight: '600',
  },
});

export default Login;
