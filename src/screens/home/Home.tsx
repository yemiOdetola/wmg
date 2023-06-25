import React from 'react';
import { Text } from 'react-native-paper';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../utils';
import homeStyles from './homeStyles'
import { Posts } from '../../components/listing';

const greetings = ["Hello, ", "Hi, ", "Goodday, ", "Greetings, ", "Yo! ", "Welcome, ", "Hey, ", "Hiya, "]

export default function Home({ navigation }: any) {

  const onChangeScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  const randomizeGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.HomeScreen}>
          <View style={homeStyles.headerGroup}>
            <View style={homeStyles.welcome}>
              <Text style={homeStyles.stylesText}>{randomizeGreeting()} <Text style={homeStyles.username}>Opeyemi</Text></Text>
            </View>
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
              <Text style={[homeStyles.creditVal]}>{Number(0).toFixed(2)}</Text>
            </View>
          </View>
          <View style={homeStyles.buttonGroup}>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f1]} onPress={() => navigation.navigate('requestPickup')}>
              <View style={[homeStyles.icon, homeStyles.icon1]}>
                <Icon style={homeStyles.featureIcon} name="bus-stop" />
              </View>
              <Text style={homeStyles.title}>New Request</Text>
              <Text style={homeStyles.subtitle}>I challenge you to dynamically change these based on the user type.</Text>
              <View style={[homeStyles.action, homeStyles.action1]}>
                <Text style={homeStyles.actionText}>Request Pickup</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f2]} onPress={() => navigation.navigate('requestPickup')}>
              <View style={[homeStyles.icon, homeStyles.icon2]}>
                <Icon style={homeStyles.featureIcon} name="calendar-month" />
              </View>
              <Text style={homeStyles.title}>New Request</Text>
              <Text style={homeStyles.subtitle}>I challenge you to dynamically change these based on the user type.</Text>
              <View style={[homeStyles.action, homeStyles.action2]}>
                <Text style={homeStyles.actionText}>Request Pickup</Text>
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
              <Text style={homeStyles.title}>Offer Notification</Text>
              <Text style={homeStyles.subtitle}>Information about updates related to offers sent and/or counter offer by households.</Text>
              <View style={[homeStyles.action, homeStyles.action4]}>
                <Text style={homeStyles.actionText}>View offer history</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}

