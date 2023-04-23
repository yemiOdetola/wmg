import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../utils';

export default function AppLoading() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <ActivityIndicator color={colors.PRIMARY} size={"large"} />
    </View>
  );
}