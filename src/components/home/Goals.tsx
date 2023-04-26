import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { map } from 'lodash';
import Loading from '../shared/InnerLoading';
import { getGoals } from "../../utils/api";
import { Text, Avatar } from 'react-native-paper';
import { styles } from '../../utils';
import { TouchableHighlight } from 'react-native';


export default function Goals() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    getGoals(1).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <>
      {isLoaded ?
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
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
        </View> : null}
    </>
  );
}

function RenderItem(props: any) {

  const navigation: any = useNavigation();

  const onChangeScreen = (id: string, title: string) => {
    navigation.navigate('singlegoal', {
      id: id,
      title: title
    });
  };

  const { item } = props;
  const { id, title } = item;

  return (
    <View style={styles.card6_view}>
      <TouchableHighlight onPress={() => onChangeScreen(id, title)}>

        <ImageBackground source={{ uri: item.image }} style={styles.card6_background} imageStyle={{ borderRadius: 8 }}>
          <View style={styles.card6_gradient}>
            <Text style={styles.card6_title} numberOfLines={2}>{item.title}</Text>
          </View>
        </ImageBackground>

      </TouchableHighlight>
    </View>

  )

}