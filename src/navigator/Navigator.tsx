import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {AuthContext} from '../context/auth';
import {LoadingScreen} from '../screens/LoadingScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {ProductsNavigator} from './ProductsNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {status} = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="ProductsNavigator"
            component={ProductsNavigator}
          />
          <Stack.Screen name="Protected" component={ProtectedScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
