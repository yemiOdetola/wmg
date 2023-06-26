import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePreferences } from '../../../hooks'


const RailSelected = () => {
  const { theme } = usePreferences();
  return (
    <View style={[styles.root, { backgroundColor: theme === 'dark' ? '#FFF' : '#000' }]} />
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
  },
});