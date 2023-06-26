import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { map } from 'lodash';
import { Text, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Grid, Col } from 'react-native-easy-grid';
import { getLatestDiets } from "../../utils/api";
import { LoadMoreButton, InnerLoading } from '../../components/shared';
import { styles } from '../../utils'

export default function Diets(props: any) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);


  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id: number, title: string) => {
    console.log('OCEANS', id, title);
    props.navigation.navigate('dietdetails', { id, title });
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page + 1);

    getLatestDiets(page + 1).then((response) => {

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
    getLatestDiets(0).then((response) => {
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

          <Grid style={{ marginBottom: 15, marginHorizontal: 5 }}>
            <Col style={{ margin: 5 }}>
              <Button icon="tag" mode="contained" labelStyle={{ fontSize: 15, letterSpacing: 0 }} uppercase={false} style={{ elevation: 0 }} contentStyle={{ width: '100%' }} onPress={() => onChangeScreen('categories')}>
                Categories
              </Button>
            </Col>
          </Grid>

          {map(items, (item, i) => (
            <TouchableOpacity key={i} onPress={() => onClickItem(item.id, item.title)}>
              <ImageBackground source={{ uri: item.image }} style={styles.card3_background} imageStyle={{ borderRadius: 8 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={styles.card3_gradient}>

                  <Text numberOfLines={1} style={styles.card3_category}>{item.category}</Text>
                  <Text numberOfLines={2} style={styles.card3_title}>{item.title}</Text>
                  <Text numberOfLines={1} style={[styles.card3_subtitle, { opacity: 0.6 }]}>{item.calories} "Kcal" | "Servings" {item.servings}</Text>

                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>

          ))}

          {renderButton()}
        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


