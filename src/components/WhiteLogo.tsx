import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={styles.img}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    width: 110,
    height: 100,
  },
});
