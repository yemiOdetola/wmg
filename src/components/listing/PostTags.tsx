import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from 'lodash';
import { InnerLoading } from '../shared';
import { getPostTags } from "../../utils/api";

export default function PostTags() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    getPostTags().then((response: any) => {
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
      {isLoaded
        ? <View style={{ marginVertical: 10 }}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {map(items, (item, index) => (
              <RenderItem key={index} item={item} />

            ))}
          </ScrollView>
        </View>
        : null}
    </>
  );
}

function RenderItem(props: any) {

  const navigation: any = useNavigation();

  const onChangeScreen = (id: number, title: string) => {
    navigation.navigate('singletag', {
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