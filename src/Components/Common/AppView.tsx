import React, {ReactNode} from 'react';
import {StyleSheet, ScrollView, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface AppViewProps {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}

const AppView = ({
  children,
  scroll = false,
  style,
  edges = ['top'],
}: AppViewProps) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={edges}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
});

export default AppView;
