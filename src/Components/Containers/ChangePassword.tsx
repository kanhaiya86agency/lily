import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../Hooks/hooks';
import {changePassword} from '../../Redux/User/UserThunk';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../../Constants/theme';
import useAppNavigation from '../Common/useAppNavigation';
import {resetUserState} from '../../Redux/User/UserSlice';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.user);
  const navigation = useAppNavigation();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [isValid, setIsValid] = useState(false);

  const validatePassword = (password: string) => {
    return (
      password.length >= 6 && /[a-zA-Z]/.test(password) && /[@]/.test(password)
    );
  };

  useEffect(() => {
    const valid =
      form.oldPassword.length >= 6 && validatePassword(form.newPassword);
    setIsValid(valid);
  }, [form]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = async () => {
    try {
      const res = await dispatch(changePassword(form));
      console.log('🚀 ~ handleSubmit ~ res:', res);

      if (changePassword.fulfilled.match(res)) {
        setError(res.payload);
        setForm({oldPassword: '', newPassword: ''});
        dispatch(resetUserState());
        navigation.goBack();
      } else if (changePassword.rejected.match(res)) {
        const errorPayload = res.payload;

        const errorMessage = Array.isArray(errorPayload)
          ? errorPayload.join('\n')
          : (errorPayload as string);

        setError(errorMessage);

        dispatch(resetUserState());
      }
    } catch (err) {
      console.error('Unexpected Error in handleSubmit:', err);
      dispatch(resetUserState());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Old Password"
        value={form.oldPassword}
        onChangeText={text => handleChange('oldPassword', text)}
        secureTextEntry={!showOld}
        mode="flat"
        underlineColor={theme.colors.primary}
        style={styles.input}
        right={
          <TextInput.Icon
            icon={showOld ? 'eye-off' : 'eye'}
            onPress={() => setShowOld(prev => !prev)}
          />
        }
      />

      <TextInput
        label="New Password"
        value={form.newPassword}
        onChangeText={text => handleChange('newPassword', text)}
        secureTextEntry={!showNew}
        mode="flat"
        underlineColor={theme.colors.primary}
        style={styles.input}
        right={
          <TextInput.Icon
            icon={showNew ? 'eye-off' : 'eye'}
            onPress={() => setShowNew(prev => !prev)}
          />
        }
      />
      <Text style={styles.hint}>{error}</Text>

      <Button
        mode="contained"
        loading={loading}
        textColor={theme.colors.white}
        onPress={handleSubmit}
        disabled={!isValid || loading}
        style={[
          styles.button,
          (!isValid || loading) && {backgroundColor: '#B0BEC5'},
        ]}
        contentStyle={{paddingVertical: 8}}>
        Update Password
      </Button>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: theme.colors.SecondaryRed,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    color: theme.colors.SecondaryRed,
    marginBottom: 10,
    textAlign: 'left',
  },
});
