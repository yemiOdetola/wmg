import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { View, ScrollView, SafeAreaView, TouchableOpacity, PermissionsAndroid, Platform, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useSelector } from 'react-redux';
import { colors, styles } from '../../utils';
import homeStyles from './homeStyles'

const greetings = ["Hello, ", "Hi, ", "Goodday, ", "Greetings, ", "Yo! ", "Welcome, ", "Hey, ", "Hiya, "]

export default function Home({ navigation }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, user } = useSelector(
    (state: any) => ({
      loading: state.ui.loading,
      user: state.auth.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    const coords = AsyncStorage.getItem('coords');
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    } else {
      Geolocation.requestAuthorization('whenInUse').then((result) => {
        if (result === 'granted') {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      }).catch((error) => {
        console.log('Error requesting location permission:', error);
      });
    }
  };

  const storeLocation = async (coords: any) => {
    try {
      await AsyncStorage.setItem('coords', JSON.stringify(coords))
    } catch (error) {
      if (error) {
        requestLocationPermission();
      }
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        storeLocation(position.coords)
      },
      (error) => { console.log('Error getting current location:', error) },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const onChangeScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      requestLocationPermission();
      setRefreshing(false);
    }, 3000);
  }

  const randomizeGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}>
        <View style={styles.HomeScreen}>
          <View style={homeStyles.headerGroup}>
            <View style={homeStyles.welcome}>
              <Text style={homeStyles.stylesText}>{randomizeGreeting()} <Text style={homeStyles.username}>{user?.name}</Text></Text>
            </View>
          </View>
          {user.role == 'user' ?
            <>
              <View style={homeStyles.balance}>
                <View>
                  <Text style={homeStyles.label}>Bin weight</Text>
                  <View style={[styles.row, styles.itemsBaseline, styles.my4]}>
                    <Text style={homeStyles.value}>{Number(12).toFixed(2)}</Text>
                    <Text style={homeStyles.extra}>KG</Text>
                  </View>
                </View>
                <TouchableOpacity style={homeStyles.req} onPress={() => navigation.navigate('requestPickup')}>
                  <Text style={homeStyles.reqTxt}>Req Pickup</Text>
                </TouchableOpacity>
              </View>
              <View style={homeStyles.credits}>
                <Text style={[homeStyles.creditLabel]}>Available credits</Text>
                <Text style={[homeStyles.creditVal]}>{Number(0).toFixed(1)}</Text>
              </View>
              <View style={homeStyles.buttonGroup}>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f1]} onPress={() => navigation.navigate('requestPickup')}>
                  <View style={[homeStyles.icon, homeStyles.icon1]}>
                    <Icon style={homeStyles.featureIcon} name="bus-stop" />
                  </View>
                  <Text style={homeStyles.title}>New Request</Text>
                  <Text style={homeStyles.subtitle}>Create new pickup requests</Text>
                  <View style={[homeStyles.action, homeStyles.action1]}>
                    <Text style={homeStyles.actionText}>Request Pickup</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f2]} onPress={() => navigation.navigate('mapmain')}>
                  <View style={[homeStyles.icon, homeStyles.icon2]}>
                    <Icon style={homeStyles.featureIcon} name="calendar-month" />
                  </View>
                  <Text style={homeStyles.title}>My Profile</Text>
                  <Text style={homeStyles.subtitle}>View and update your user information. This might help during pickup.</Text>
                  <View style={[homeStyles.action, homeStyles.action2]}>
                    <Text style={homeStyles.actionText}>View Profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f4]} onPress={() => onChangeScreen('myRequests')}>
                  <View style={[homeStyles.icon, homeStyles.icon4]}>
                    <Icon style={homeStyles.featureIcon} name="database-cog-outline" />
                  </View>
                  <Text style={homeStyles.title}>View Requests</Text>
                  <Text style={homeStyles.subtitle}>Access to the history and status of previously requested pickups.</Text>
                  <View style={[homeStyles.action, homeStyles.action4]}>
                    <Text style={homeStyles.actionText}>View requests</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f3]}>
                  <View style={[homeStyles.icon, homeStyles.icon3]}>
                    <Icon style={homeStyles.featureIcon} name="dots-triangle" />
                  </View>
                  <Text style={homeStyles.title}>Leaderboard</Text>
                  <Text style={homeStyles.subtitle}>See your ranking based on your recycling efforts and participation in the system.</Text>
                  <View style={[homeStyles.action, homeStyles.action3]}>
                    <Text style={homeStyles.actionText}>Participation to win</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
            : null}
          {user.role == 'recycler' ?
            <>
              <View style={[homeStyles.balance, homeStyles.balanceRec]}>
                <View>
                  <Text style={homeStyles.label}>Total Available</Text>
                  <View style={[styles.row, styles.itemsBaseline, styles.my4]}>
                    <Text style={homeStyles.value}>{Number(219).toFixed(2)}</Text>
                    <Text style={homeStyles.extra}>KG</Text>
                  </View>
                </View>
                <TouchableOpacity style={homeStyles.req} onPress={() => navigation.navigate('requestPickup')}>
                  <Text style={homeStyles.reqTxt}>Schedule Pickup</Text>
                </TouchableOpacity>
              </View>
              <View style={homeStyles.credits}>
                <Text style={[homeStyles.creditLabel]}>Ratings</Text>
                <Text style={[homeStyles.creditVal]}>
                  {Number(4.3).toFixed(1)}
                  <Icon name="star-outline" size={18} color={colors.PRIMARY} />
                </Text>
              </View>
              <View style={homeStyles.buttonGroup}>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f6]}>
                  <View style={[homeStyles.icon, homeStyles.icon2]}>
                    <Icon style={homeStyles.featureIcon} name="dots-triangle" />
                  </View>
                  <Text style={homeStyles.title}>Track Requests</Text>
                  <Text style={homeStyles.subtitle}>Visual representation of available pickup requests; including locations and waste resources.</Text>
                  <View style={[homeStyles.action, homeStyles.action2]}>
                    <Text style={homeStyles.actionText}>Track</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f7]} onPress={() => navigation.navigate('requestPickup')}>
                  <View style={[homeStyles.icon, homeStyles.icon1]}>
                    <Icon style={homeStyles.featureIcon} name="bus-stop" />
                  </View>
                  <Text style={homeStyles.title}>Leaderboard</Text>
                  <Text style={homeStyles.subtitle}>Ranking based on your ratings and participation on the platform.</Text>
                  <View style={[homeStyles.action, homeStyles.action1]}>
                    <Text style={homeStyles.actionText}>Track your progress</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f8]} onPress={() => onChangeScreen('mapmain')}>
                  <View style={[homeStyles.icon, homeStyles.icon3]}>
                    <Icon style={homeStyles.featureIcon} name="calendar-month" />
                  </View>
                  <Text style={homeStyles.title}>Schedule pickup</Text>
                  <Text style={homeStyles.subtitle}>Setup a pickup time and date. This enable households to plan ahead for the pickup</Text>
                  <View style={[homeStyles.action, homeStyles.action3]}>
                    <Text style={homeStyles.actionText}>Schedule</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[homeStyles.button, homeStyles.f9]} onPress={() => onChangeScreen('myRequests')}>
                  <View style={[homeStyles.icon, homeStyles.icon4]}>
                    <Icon style={homeStyles.featureIcon} name="database-cog-outline" />
                  </View>
                  <Text style={homeStyles.title}>Offer History</Text>
                  <Text style={homeStyles.subtitle}>Information about updates related to offers sent and/or counter offer by households.</Text>
                  <View style={[homeStyles.action, homeStyles.action4]}>
                    <Text style={homeStyles.actionText}>View offer history</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
            : null}
        </View>
      </ScrollView>
    </SafeAreaView >
  );

}

