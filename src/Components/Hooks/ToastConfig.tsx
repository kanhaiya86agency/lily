import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  success: (props: any) => (
    <BaseToast
      {...props}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
    />
  ),
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 14,
    color: '#333',
    flexWrap: 'wrap',
  },
});
