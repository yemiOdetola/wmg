import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../utils';

export default function AppLoading() {

  return (
    <View style={{ marginVertical: 25 }}>
      <ActivityIndicator color={colors.PRIMARY} size={25} />
    </View>
  );
}