import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import 'react-native-gesture-handler';
import {Navigator} from './src/navigator/Navigator';
import {AuthProvider} from './src/context/auth/AuthProvider';
import {ProductsProvider} from './src/context/products';

const AppState = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
