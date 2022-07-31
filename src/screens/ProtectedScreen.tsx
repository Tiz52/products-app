import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/auth';

export const ProtectedScreen = () => {
  const {user, token, logOut} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>
      <Button title="Logout" color="#5856D6" onPress={logOut} />
      <Text style={styles.title}>{JSON.stringify(user, null, 5)}</Text>
      <Text style={styles.title}>{token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#5856D6',
  },
});
