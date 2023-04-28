import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { getWorkoutById, removeWorkoutBookmark, setWorkoutBookmark } from "../../utils/api";
import { InnerLoading } from '../../components/shared';
import { Col, Grid } from 'react-native-easy-grid';
import { LevelRate } from '../../components/shared';
import { Days } from '../../components/workout';
import { styles } from '../../utils';

export default function WorkoutDetails(props: any) {

  const { route } = props;
  const { id, title } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookmark, setBookmark] = useState<Boolean | any>(null);
  const [item, setItem] = useState<any>([]);

  const renderBookMark = async (id: string) => {
    await AsyncStorage.getItem('workoutsFav').then((token: any) => {
      const res = JSON.parse(token);

      if (res !== null) {
        let data = res.find((value: any) => value.id === id);

        if (data !== null) {
          let data = res.find((value: any) => value.id === id);
          return data == null ? setBookmark(false) : setBookmark(true);
        }

      } else {
        return false;
      }

    });
  };

  useEffect(() => {
    renderBookMark(id);
  }, []);

  const saveBookmark = (id: number, title: string, image: any) => {

    let data = { id, title, image };
    setBookmark(true);
    setWorkoutBookmark(data).then(token => {
      if (token === true) {
        setBookmark(true);
      }
    });

  };

  const removeBookmark = (id: number) => {
    removeWorkoutBookmark(id).then(token => {
      if (token === true) {
        setBookmark(false);
      }

    });

  };

  const renderButtonFav = () => {

    if (!isBookmark) {
      return (
        <IconButton icon="heart-outline" size={24} style={{ marginRight: 15 }} onPress={() => saveBookmark(item.id, item.title, item.image)} />
      )
    } else {
      return (
        <IconButton icon="heart" size={24} style={{ marginRight: 15 }} onPress={() => removeBookmark(item.id)} />
      )
    }
  }

  useEffect(() => {

    props.navigation.setOptions({
      headerRight: () => renderButtonFav(),
    });

  }, [isBookmark, item]);

  useEffect(() => {
    getWorkoutById(id).then((response) => {
      setItem(response[0]);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {

    return (

      <View style={{ marginTop: 50 }}>
        <InnerLoading />
      </View>

    );

  } else {

    return (

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <SafeAreaView>

          <View>

            <ImageBackground source={{ uri: item.image }} style={styles.HeaderImage} resizeMode={'cover'}>
              <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.HeaderGradient}>

                <Text style={styles.HeaderTitle}>{item.title}</Text>
                <Text style={styles.HeaderSubTitle}>{item.duration}</Text>

                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <LevelRate rate={item.rate} iconsize={22}></LevelRate>
                </View>

              </LinearGradient>
            </ImageBackground>

            <Grid style={styles.WorkoutGrid}>

              <Col style={styles.WorkoutGridCol}>
                <Text style={styles.WorkoutGridTitle}>Level</Text>
                <Text style={styles.WorkoutGridSubTitle}>{item.level}</Text>
              </Col>

              <Col style={styles.WorkoutGridCol}>
                <Text style={styles.WorkoutGridTitle}>Goal</Text>
                <Text style={styles.WorkoutGridSubTitle}>{item.goal}</Text>
              </Col>

            </Grid>

            <Days Number={7} WorkoutId={item.id}></Days>

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


