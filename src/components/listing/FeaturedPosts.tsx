import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { Paragraph, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { map } from 'lodash';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import { getFeaturedPosts } from "../../utils/api";
import { InnerLoading } from '../shared';
import { colors, styles } from "../../utils";

export default function FeaturedPosts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation: any = useNavigation();

  const onChangeScreen = (id: number, title: string) => {
    navigation.navigate('postdetails', { id, title });
  };

  useEffect(() => {
    getFeaturedPosts().then((response) => {
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

            <TouchableNativeFeedback key={i} onPress={() => onChangeScreen(item.id, item.title)}>
              <ImageBackground source={{ uri: item.image }} style={styles.card1_background} imageStyle={{ borderRadius: 8 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card1_gradient}>

                  <View style={[styles.card3_viewicon, { paddingLeft: 5, paddingVertical: 6 }]}>
                    <Text style={[styles.card3_icon, { paddingLeft: 0 }]}>{item.tag}</Text>
                  </View>

                  <Paragraph style={styles.card1_subtitle}>{item.level}</Paragraph>
                  <Text numberOfLines={2} style={styles.card1_title}>{item.title}</Text>
                  <Text numberOfLines={1} style={[styles.card1_title, { color: colors.PRIMARY, marginVertical: 5 }]}>{moment(item.date).fromNow()}</Text>

                </LinearGradient>
              </ImageBackground>
            </TouchableNativeFeedback>

          ))}
        </ScrollView>
        : null}
    </View>
  );
}