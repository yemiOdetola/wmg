import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { map } from 'lodash';
import { Text, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { LoadMoreButton, NoContentFound, InnerLoading, LevelRate } from '../../components/shared';
import { getWorkoutsByGoal } from '../../utils/api';
import { styles } from '../../utils';

export default function SingleGoal(props: any) {

  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id: number, title: string) => {
    navigation.navigate('workoutdetails', { id, title });
  };

  const buttonSearch = () => {
    return (
      <IconButton icon="magnify" size={24} style={{ marginLeft: 15 }} onPress={() => onChangeScreen('searchworkout')} />
    )
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page + 1);

    getWorkoutsByGoal(id, page + 1).then((response) => {

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
      title: title,
      headerRight: () => buttonSearch()
    });

  }, []);

  useEffect(() => {
    getWorkoutsByGoal(id, 0).then((response) => {
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

        ? <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <SafeAreaView>

            <View style={styles.ContentScreen}>

              {map(items, (item, i) => (

                <TouchableNativeFeedback key={i} onPress={() => onClickItem(item.id, item.title)}>
                  <ImageBackground source={{ uri: item.image }} style={styles.card3_background} imageStyle={{ borderRadius: 8 }}>
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card3_gradient}>

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

              <NoContentFound data={items} />

            </View>
          </SafeAreaView>
        </ScrollView>
        : null}
    </>
  );

}


