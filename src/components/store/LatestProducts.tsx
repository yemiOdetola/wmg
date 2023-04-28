import React, { useState, useEffect } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from 'lodash';
import { getLatestProducts } from "../../utils/api";
import { styles, colors } from '../../utils';
import { InnerLoading } from '../shared';

export default function LatestProducts() {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigation: any = useNavigation();

  const onChangeScreen = (id: number) => {
    navigation.navigate('productdetails', { id });
  };

  useEffect(() => {
    getLatestProducts(0).then((response) => {
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

    <View style={{ width: '100%', marginTop: 10, marginLeft: 20 }}>
      {isLoaded
        ? <>
          {map(items, (item: any, i: number) => (

            <TouchableNativeFeedback key={i} onPress={() => onChangeScreen(item.id)}>
              <List.Item
                key={i}
                title={item.title}
                titleStyle={{ fontWeight: 'bold', fontSize: 15, marginBottom: 3 }}
                titleNumberOfLines={2}
                description={item.price}
                descriptionStyle={{ color: colors.PRIMARY, fontWeight: 'bold', fontSize: 15 }}
                underlayColor="transparent"
                rippleColor="transparent"
                left={props => <Avatar.Image size={70} style={{ marginRight: 10 }} source={{ uri: item.image }} />}
                right={props => <List.Icon {...props} icon="chevron-right"
                  style={{ alignSelf: 'center', opacity: 0.3, marginBottom: 30 }} />}
              />
            </TouchableNativeFeedback>

          ))}
        </>
        : null}
    </View>

  );

}