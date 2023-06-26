import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../utils';
import { map } from 'lodash';
import { InnerLoading } from '../shared';
import { getLatestWorkouts } from "../../utils/api";
import { Paragraph, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import LevelRate from '../shared/LevelRate';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LatestWorkouts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation: any = useNavigation();

  const onChangeScreen = (id: number, title: string) => {
    navigation.navigate('workoutdetails', { id, title });
  };

  useEffect(() => {
    getLatestWorkouts(1).then((response: any) => {
      console.log('responseeee: ', response);
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
        <View style={{ marginTop: 10 }}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {map(items, (item: any, i: number) => (
              <TouchableNativeFeedback key={i} onPress={() => onChangeScreen(item.id, item.title)}>
                <ImageBackground source={{ uri: item.image }} style={styles.card1_background} imageStyle={{ borderRadius: 8 }}>
                  <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card1_gradient}>

                    {/*item.price === "premium" ? <View style={Styles.card1_viewicon}><Icon name="lock" style={Styles.card1_icon}/></View> : null */}

                    {item.rate ?
                      <View style={[styles.card1_viewicon, { flexDirection: 'row' }]}>
                        <LevelRate rate={item.rate} />
                      </View> : null}
                    <Paragraph style={styles.card1_subtitle}>{item.level}</Paragraph>
                    <Text numberOfLines={2} style={styles.card1_title}>{item.title}</Text>

                  </LinearGradient>
                </ImageBackground>
              </TouchableNativeFeedback>

            ))}
          </ScrollView>
        </View> : null}
    </>
  );
}