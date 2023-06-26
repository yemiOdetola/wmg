import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { map } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Grid, Col } from 'react-native-easy-grid';
import { InnerLoading, LevelRate, LoadMoreButton } from '../../components/shared';
import { getLatestWorkouts } from "../../utils/api";
import { colors, styles } from '../../utils';

export default function Workouts(props: any) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);


  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id: number, title: string) => {
    props.navigation.navigate('workoutdetails', { id, title });
  };

  const buttonSearch = () => {
    return (
      <IconButton icon="magnify" size={24} style={{ marginLeft: 15 }} onPress={() => onChangeScreen('searchworkout')} />
    )
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page + 1);

    getLatestWorkouts(page + 1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      } else {
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
        Indicator={loading}
        showButton={showButton}
        Items={items}
        Num={5}
        Click={() => loadMore()} />
    )
  }

  useEffect(() => {

    props.navigation.setOptions({
      headerRight: () => buttonSearch()
    });

  }, []);

  useEffect(() => {
    getLatestWorkouts(0).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return (
      <InnerLoading />
    );

  } else {

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <SafeAreaView>

          <View style={styles.ContentScreen}>

            <Grid style={{ marginBottom: 15, marginHorizontal: 5 }}>
              <Col style={{ margin: 5 }}>
                <Button icon="lightning-bolt" mode="contained"
                  labelStyle={{ fontSize: 15, letterSpacing: 0 }} uppercase={false} style={{ elevation: 0 }} contentStyle={{ width: '100%' }}
                  onPress={() => onChangeScreen('goals')}
                >
                  Goals
                </Button>
              </Col>
              <Col style={{ margin: 5 }}>
                <Button icon="equalizer" mode="contained"
                  labelStyle={{ fontSize: 15, letterSpacing: 0 }} uppercase={false} style={{ elevation: 0 }} contentStyle={{ width: '100%' }}
                  onPress={() => onChangeScreen('levels')}
                >
                  Levels
                </Button>
              </Col>
            </Grid>

            {map(items, (item, i) => (

              <TouchableNativeFeedback key={i} onPress={() => onClickItem(item.id, item.title)}>
                <ImageBackground source={{ uri: item.image }} style={styles.card3_background} imageStyle={{ borderRadius: 8 }}>
                  <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card3_gradient}>

                    <View style={styles.card3_viewicon}>
                      <Icon name="lock" color={colors.PRIMARY} size={15}></Icon>
                      <Text style={styles.card3_icon}>Premium</Text>
                    </View>

                    <View style={styles.card3_viewicon}>
                      {item.rate ? <LevelRate rate={item.rate} /> : null}
                    </View>

                    <Text numberOfLines={2} style={styles.card3_title}>{item.title}</Text>
                    <Text numberOfLines={2} style={styles.card3_subtitle}>{item.duration}</Text>

                  </LinearGradient>
                </ImageBackground>
              </TouchableNativeFeedback>

            ))}

            {renderButton()}

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


