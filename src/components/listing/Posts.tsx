import React, { useState, useEffect } from 'react';
import { FlatList, Image, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { map } from "lodash";
import { InnerLoading } from '../shared';
import { usePreferences } from '../../hooks';
import { getLatestPosts } from "../../utils/api";
import listingStyles from './listingStyles';


const idsx = {
  date: "2018-03-02 09:06:25",
  size: 12,
  category: 'electronics',
  image: "https://picsum.photos/200/300",
  rating: 4.5,
  location: 'Sparklight extension, ojodu berger, Lagos state',


  "description": "<p>At the core of every movement is just that: your core. And while lots of times “core” and “abs” become synonymous, it's not 100% correct to use them interchangeably. Your rectus abdominus, transverse abdominus and obliques do comprise your midsection, but those aren't the only muscles involved. Your back, hips and glutes also provide that stable base you need for stepping forward and backward, jumping side-to-side or turning all about. So to get a serious core workout you need to work them all.</p><p>“Core strength and stability not only enhances physical and athletic performance, but also helps maintain and correct posture and form, and prevent injury,” says Andia Winslow, a Daily Burn Audio Workouts trainer. “Those who have an awareness of their core and ability to engage it properly also have enhanced proprioception — or a sense of the positions of their extremities, without actually seeing them.”</p>",
  "featured": 0,
  "id": 9,
  "tag": "Tips",
  "title": "5 Ways to Torch Your Core in Every Workout"
};


export default function LatestPosts() {
  const { theme } = usePreferences();

  const [posts, setPosts] = useState([]);
  const navigation: any = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currency] = useState('₦‎');

  const [items, setItems] = React.useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' },
    { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' },
    { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' },
    { name: 'ASBESTOS', code: '#7f8c8d' },
  ]);

  useEffect(() => {
    getLatestPosts(0).then((response) => {
      setPosts(response);
      setIsLoaded(true);
    });
  }, []);

  const onChangeScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  const onClickItem = (id: number = 15, title: string = '15kg Stuffed Peppers') => {
    navigation.navigate('listingDetails', { id, title });
  };


  if (!isLoaded) {
    return (
      <InnerLoading />
    );
  }

  const renderGridItems = (item: any) => {
    console.log('item', item);
    return (
      <TouchableOpacity onPress={() => onClickItem(item.id, item.title)}>
        <View style={listingStyles.itemContainer}>
          <View style={listingStyles.avatar}>
            <Image style={listingStyles.avatarImg} source={{ uri: "https://picsum.photos/200/200" }} />
          </View>
          <View style={listingStyles.details}>
            <Text style={[listingStyles.categoryText, { color: item.code }]}>Electronics</Text>
            <Text style={[listingStyles.title, { color: theme == 'dark' ? '#f1f1f1' : '#555555', }]}>HP 15' laptops (dead) </Text>
            <Text style={[listingStyles.location, { color: theme == 'dark' ? '#e5e5e5' : '#8d99ae', }]}>Sparklight extension, ojodu berger, Lagos state</Text>
            <View style={listingStyles.meta}>
              <View style={listingStyles.stat}>
                <View style={listingStyles.eachStat}>
                  <Icon name="weight-kilogram" style={listingStyles.metaIcon} />
                  <Text style={[listingStyles.metaText, { color: theme == 'dark' ? '#f1f1f1' : '#555555', }]}>12kg</Text>
                </View>
                <View style={listingStyles.eachStat}>
                  <Icon name="beaker-plus-outline" style={listingStyles.metaIcon} />
                  <Text style={[listingStyles.metaText, { color: theme == 'dark' ? '#f1f1f1' : '#555555', }]}>875 pcs</Text>
                </View>
              </View>
              <Text style={[listingStyles.price, { color: theme == 'dark' ? '#f1f1f1' : '#555555', }]}>{currency}2500</Text>
            </View>
          </View>
        </View >
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={items}
      style={listingStyles.gridView}
      renderItem={({ item }) => renderGridItems(item)}
    />

  );

}