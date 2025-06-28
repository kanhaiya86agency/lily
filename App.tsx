import React from 'react';
import AppNavigation from './src/AppNavigation';
import 'react-native-reanimated';
import {IntlProvider} from 'react-intl';
import en from './src/lang/en.json';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import {DefaultTheme, PaperProvider} from 'react-native-paper';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#000000',
      background: '#ffffff',
      primary: '#6200ee',
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider locale="en" messages={en}>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <GestureHandlerRootView>
                <BottomSheetModalProvider>
                  {Platform.OS === 'android' && (
                    <StatusBar
                      backgroundColor={theme.colors.primary}
                      barStyle="light-content"
                    />
                  )}
                  <AppNavigation />;
                  <Toast />
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </PaperProvider>
          </SafeAreaProvider>
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
