import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '';

export const storeToken = async (token: string, id?: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem('USER_ID', id ?? '');
  } catch (error) {
    console.error('Error storing token', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('USER_ID');
  } catch (error) {
    console.error('Error getting USER_ID', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token', error);
  }
};
