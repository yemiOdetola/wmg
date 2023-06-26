import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { map } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { InnerLoading } from '../shared';
import { getProductTypes } from "../../utils/api";

export default function ProductTypes() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProductTypes().then((response) => {
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
    <View style={{ marginVertical: 10 }}>
      {isLoaded
        ? <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {map(items, (item, index) => (
            <RenderItem key={index} item={item} />
          ))}
        </ScrollView>
        : null}
    </View>
  );
}

function RenderItem(props: any) {

  const navigation: any = useNavigation();

  const onChangeScreen = (id: any, title: string) => {
    navigation.navigate('singletype', {
      id: id,
      title: title
    });
  };

  const { item } = props;
  const { id, title } = item;

  return (

    <View style={{ marginLeft: 15 }}>
      <Chip icon="tag" mode="outlined" onPress={() => onChangeScreen(id, title)}>{item.title}</Chip>
    </View>

  )

}