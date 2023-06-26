import React from 'react';
import { View, I18nManager, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { map } from 'lodash';
import { styles } from '../../utils';

export default function Days(props: any) {
  const { Number, WorkoutId } = props;
  const navigation: any = useNavigation();

  const totalDays = Array.from(Array(Number).keys());


  const onChangeScreen = (id: number, day: number, title: string) => {
    navigation.navigate('singleday', { id, day, title });
  };

  return (

    <View style={{ marginVertical: 10, marginBottom: 40 }}>

      {map(totalDays, (i) => (

        <TouchableHighlight key={i} activeOpacity={1} onPress={() => onChangeScreen(WorkoutId, i + 1, 'Day' + ' ' + (i + 1))}>
          <View style={styles.DayList}>
            <Text style={styles.DayListText}>{'Day' + ' ' + (i + 1)}</Text>
            <Icon name="chevron-right" style={styles.DayListIcon} />
          </View>
        </TouchableHighlight>

      ))}

    </View>

  );

}