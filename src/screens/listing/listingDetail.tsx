import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text, IconButton, Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Col, Grid } from 'react-native-easy-grid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDietById, removeDietBookmark, setDietBookmark } from "../../utils/api";
import { InnerLoading } from '../../components/shared';
import { usePreferences } from '../../hooks';
import { styles } from '../../utils';

export default function ListingDetails(props: any) {

  const { route } = props;
  const { id, title } = route.params;

  const { theme } = usePreferences();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookmark, setBookmark] = useState<boolean>(false);
  const [item, setItem] = useState<any>({});

  const renderBookmark = async (id: any) => {
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
    renderBookmark(id);
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

  const renderOptionsButton = () => {
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
      headerRight: () => renderOptionsButton()
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

    <KeyboardAwareScrollView showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
      <SafeAreaView>
        <ImageBackground source={{ uri: "https://unsplash.com/photos/qph7tJfcDys" }} style={styles.Header2Image} resizeMode={'cover'}>
          <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.Header2Gradient}>
            <Text style={styles.Header2Category}>Category</Text>
            <Text style={styles.Header2Title}>Hand Tied Scraps Bundle</Text>
            <Text style={styles.Header2SubTitle}>Non-negotiable</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={{ marginTop: 15, marginHorizontal: 15 }}>
          <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
            <Card.Title title="Summary" />
            <Card.Content>
              <Text>Material: Clean Recycled PP with no foreign contamination
                Contains antistat agent that reduces static charge build-up in products.
                Safe to use in contact with foodstuff, pharmaceuticals, and drinking water.
              </Text>
            </Card.Content>
          </Card>

          <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
            <Card.Title title="Additional Information" />
            <Card.Content>
              <Text>No extra info</Text>
            </Card.Content>
          </Card>

          <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
            <Card.Title title="Meet your seller" />
            <Card.Content>
              <Text>Household's INFORMATION</Text>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>

  );

}


