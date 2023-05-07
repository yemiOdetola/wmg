import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Text, IconButton, Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Col, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLView from 'react-native-render-html';
import { getDietById, removeDietBookmark, setDietBookmark } from "../../utils/api";
import { InnerLoading } from '../../components/shared';
import { usePreferences } from '../../hooks';
import { styles, HTMLStylesDark, HTMLStyles } from '../../utils';

export default function ListingDetails(props: any) {

  const { width } = useWindowDimensions();
  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;

  const { theme } = usePreferences();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookmark, setBookmark] = useState<boolean>(false);
  const [item, setItem] = useState<any>({});

  const renderBookMark = async (id: any) => {
    await AsyncStorage.getItem('dietsFav').then((token: any) => {
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

  const saveBookmark = (id: number, title: string, image: any = "https://picsum.photos/200/300") => {

    let data = { id, title, image };
    setBookmark(true);
    setDietBookmark(data).then(token => {
      if (token === true) {
        setBookmark(true);
      }
    });

  };

  const removeBookmark = (id: number) => {
    removeDietBookmark(id).then(token => {
      if (token === true) {
        setBookmark(false);
      }

    });
  };

  const renderButtonFav = () => {
    if (!isBookmark) {
      return (
        <TouchableOpacity onPress={() => saveBookmark(item.id, item.title, item.image)} style={styles.headerOption}>
          <IconButton icon="dump-truck" iconColor={'#fff'} size={20} style={{ marginRight: 2 }}
            onPress={() => saveBookmark(item.id, item.title, item.image)} />
          <Text>Accept Pickup</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => removeBookmark(item.id)} style={styles.headerOption}>
          <IconButton icon="cancel" iconColor={"#ff0000"} size={20} style={{ marginRight: 2 }}
            onPress={() => removeBookmark(item.id)} />
          <Text>Remove Pickup</Text>
        </TouchableOpacity>
      )
    }
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => renderButtonFav()
    });

  }, [isBookmark, item]);

  useEffect(() => {
    getDietById(id).then((response) => {
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
  }

  return (

    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >

      <SafeAreaView>

        <View>

          <ImageBackground source={{ uri: item.image }} style={styles.Header2Image} resizeMode={'cover'}>
            <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.Header2Gradient}>

              <Text style={styles.Header2Category}>{item.category}</Text>
              <Text style={styles.Header2Title}>{item.title}</Text>
              <Text style={styles.Header2SubTitle}>{"Servings" + ' ' + item.servings + ' | ' + "Prep Time:" + ' ' + item.time}</Text>

            </LinearGradient>
          </ImageBackground>

          <Grid style={styles.DietGrid}>

            <Col style={styles.DietGridCol}>
              <Text style={styles.DietGridTitle}>{item.calories}</Text>
              <Text style={styles.DietGridSubTitle}>Calories</Text>
            </Col>

            <Col style={styles.DietGridCol}>
              <Text style={styles.DietGridTitle}>{item.protein}</Text>
              <Text style={styles.DietGridSubTitle}>Protein</Text>
            </Col>

            <Col style={styles.DietGridCol}>
              <Text style={styles.DietGridTitle}>{item.fat}</Text>
              <Text style={styles.DietGridSubTitle}>Fat</Text>
            </Col>

            <Col style={styles.DietGridCol}>
              <Text style={styles.DietGridTitle}>{item.carbs}</Text>
              <Text style={styles.DietGridSubTitle}>Carbs</Text>
            </Col>

          </Grid>

          <View style={{ marginTop: 15, marginHorizontal: 15 }}>
            <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
              <Card.Title title="Summary" />
              <Card.Content>
                <HTMLView source={{ html: item.description ? item.description : `<p></p>` }}
                  contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
              </Card.Content>
            </Card>

            <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
              <Card.Title title="Ingredients" />
              <Card.Content>
                <HTMLView source={{ html: item.ingredients ? item.ingredients : `<p></p>` }} contentWidth={width}
                  tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
              </Card.Content>
            </Card>

            <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
              <Card.Title title="Instructions" />
              <Card.Content>
                <HTMLView source={{ html: item.instructions ? item.instructions : `<p></p>` }} contentWidth={width}
                  tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
              </Card.Content>
            </Card>

          </View>

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


