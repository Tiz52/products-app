import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Background = () => {
  return <View style={styles.background} />;
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#5856D6',
    top: -250,
    bottom: 0,
    width: 1000,
    height: 1200,
    transform: [{rotate: '-70deg'}],
  },
});
