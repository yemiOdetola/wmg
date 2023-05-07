import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { FlatGrid } from 'react-native-super-grid';
import { Grid, Col } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';
import { getBodyparts } from "../../utils/api";
import { InnerLoading } from '../../components/shared';
import { styles } from '../../utils';

export default function Exercises(props: any) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id: number, title: string) => {
    props.navigation.navigate('singleExercise', { id, title });
  };

  useEffect(() => {
    getBodyparts(0).then((response) => {
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

    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >

      <SafeAreaView>

        <View style={styles.ContentScreen}>

          <Grid style={{ marginBottom: 10, marginHorizontal: 5 }}>
            <Col style={{ margin: 5 }}>
              <Button icon="dumbbell" mode="contained"
                labelStyle={{ fontSize: 15, letterSpacing: 0 }} uppercase={false} style={{ elevation: 0 }} contentStyle={{ width: '100%' }}
                onPress={() => onChangeScreen('equipments')}>
                Exercises By Equipment
              </Button>
            </Col>
          </Grid>

          <FlatGrid
            itemDimension={130}
            data={items}
            renderItem={({ item }: any) => (
              <TouchableOpacity activeOpacity={1} onPress={() => onClickItem(item.id, item.title)}>
                <ImageBackground source={{ uri: item.image }} style={styles.card5_background} imageStyle={{ borderRadius: 8 }}>
                  <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card5_gradient}>
                    <Text numberOfLines={1} style={styles.card5_title}>{item.title}</Text>
                    <View style={styles.card5_border}></View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


