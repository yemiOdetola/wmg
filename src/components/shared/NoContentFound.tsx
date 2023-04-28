import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { size } from 'lodash';

export default function NoContentFound(props: any) {
  const { data } = props;

  if (size(data) < 1) {

    return (
      <View style={{ alignSelf: 'center', marginTop: 20 }}>
        <Text style={{ opacity: 0.5, fontSize: 16 }}>No Items Found</Text>
      </View>
    );

  } else {
    return null;
  }

}