import React, { useState, useEffect } from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from "lodash";
import { InnerLoading } from '../shared';
import { getLatestPosts } from "../../utils/api";
import moment from 'moment';

export default function LatestPosts() {

  const [items, setItems] = useState([]);
  const navigation: any = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getLatestPosts(0).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);


  const onChangeScreen = (id: number, title: string) => {
    navigation.navigate('postdetails', { id, title });
  };



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

            <TouchableNativeFeedback key={i} onPress={() => onChangeScreen(item.id, item.title)}>
              <List.Item
                key={i}
                title={item.title}
                titleStyle={{ fontWeight: 'bold', fontSize: 15, marginBottom: 3 }}
                titleNumberOfLines={2}
                description={moment(item.date).fromNow()}
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