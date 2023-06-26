import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { map } from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFeaturedProducts } from "../../utils/api";
import { styles, colors } from '../../utils';
import { InnerLoading } from '../shared';

export default function FeaturedProducts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation: any = useNavigation();

  const onChangeScreen = (id: number) => {
    navigation.navigate('productdetails', { id });
  };

  useEffect(() => {
    getFeaturedProducts().then((response) => {
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
    <View style={{ marginTop: 20 }}>
      {isLoaded
        ? <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {map(items, (item: any, i: number) => (

            <TouchableNativeFeedback key={i} onPress={() => onChangeScreen(item.id)}>
              <ImageBackground source={{ uri: item.image }} style={styles.card1_background} imageStyle={{ borderRadius: 8 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card1_gradient}>

                  <View style={styles.card1_viewicon}>
                    <Icon name="percent" style={[styles.card1_icon, { fontSize: 14 }]} />
                  </View>

                  <Text numberOfLines={2} style={styles.card1_title}>{item.title}</Text>
                  <Text numberOfLines={1} style={[styles.card1_title, { color: colors.PRIMARY, marginVertical: 5 }]}>{item.price}</Text>

                </LinearGradient>
              </ImageBackground>
            </TouchableNativeFeedback>

          ))}
        </ScrollView>
        : null}
    </View>
  );
}