import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

const Rail = () => {
  return (
    <View style={styles.root} />
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#7f7f7f',
    backgroundColor: 'transparent',
  },
});