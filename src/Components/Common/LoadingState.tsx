import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LoadingState = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 4 ? prev + '.' : ''));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading{dots}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
});

export default LoadingState;
