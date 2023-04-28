import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { size } from "lodash";
import { Text, ActivityIndicator } from 'react-native-paper';
import { colors, styles } from '../../utils';

export default function LoadMoreButton(props: any) {

  const { Indicator, showButton, Items, Click, Num } = props;

  if (size(Items) >= Num) {

    if (showButton) {
      return (
        <View style={{ height: 100 }}>
          <TouchableOpacity activeOpacity={0.9} style={styles.LoadMore} onPress={Click}>
            <Text style={{ color: colors.PRIMARY }}>
              {!Indicator ? 'Load More...' : (<ActivityIndicator animating={Indicator} size={20} color={colors.PRIMARY} />)}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.NoMoreItems}>
          <Text style={{ opacity: 0.3 }}>No More Items</Text>
        </View>
      )

    }
  } else {
    return null
  }

}

