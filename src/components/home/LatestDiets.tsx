import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { InnerLoading } from '../shared';
import { getLatestDiets } from "../../utils/api";
import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';
import { styles } from '../../utils';

export default function LatestWorkouts(props: any) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();

  const onChangeScreen = (id: string, title: string) => {
    props.navigation.navigate('dietdetails', { id, title });
  };

  useEffect(() => {
    getLatestDiets(1).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);


  if (!isLoaded) {
    return (
      <InnerLoading />
    );
  }

  return (
    <>
      {isLoaded ?
        <View style={{ marginHorizontal: 10 }}>
          <FlatGrid
            itemDimension={130}
            data={items}
            renderItem={({ item }: any) => (
              <TouchableNativeFeedback onPress={() => onChangeScreen(item.id, item.title)}>
                <ImageBackground source={{ uri: item.image }} style={styles.card4_background} imageStyle={{ borderRadius: 8 }}>
                  <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card4_gradient}>
                    <View style={styles.card4_viewicon}>
                      <Text style={{ fontSize: 12, color: '#fff', opacity: 0.8 }}>{item.calories} Kcal</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.card4_title}>{item.title}</Text>

                  </LinearGradient>
                </ImageBackground>
              </TouchableNativeFeedback>

            )}
          />
        </View>
        : null}
    </>
  );
}
