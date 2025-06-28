import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

const {height} = Dimensions.get('window');

const LoginNew = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/Images/LoginBg.png')}
        style={styles.topBackground}
        resizeMode="cover">
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>AppLogo here</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email or Phone Number"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBackground: {
    height: height * 0.5, // Half of the screen height
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    backgroundColor: 'rgba(255,255,255,0.6)', // optional: semi-transparent bg
    padding: 16,
    borderRadius: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    // justifyContent: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
});

export default LoginNew;
