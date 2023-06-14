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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>

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
            <TouchableOpacity style={[homeStyles.button, homeStyles.f1]}>
              <View style={[homeStyles.icon, homeStyles.icon1]}>
                <Icon style={homeStyles.featureIcon} name="bus-stop" />
              </View>
              <Text style={homeStyles.title}>New Request</Text>
              <Text style={homeStyles.subtitle}>I challenge you to dynamically change these based on the user type.</Text>
              <View style={[homeStyles.action, homeStyles.action1]}>
                <Text style={homeStyles.actionText}>Request Pickup</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f3]} onPress={() => onChangeScreen('mapmain')}>
              <View style={[homeStyles.icon, homeStyles.icon3]}>
                <Icon style={homeStyles.featureIcon} name="calendar-month" />
              </View>
              <Text style={homeStyles.title}>Tracking</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action3]}>
                <Text style={homeStyles.actionText}>Track collector</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f4]}>
              <View style={[homeStyles.icon, homeStyles.icon4]}>
                <Icon style={homeStyles.featureIcon} name="database-cog-outline" />
              </View>
              <Text style={homeStyles.title}>View Requests</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action4]}>
                <Text style={homeStyles.actionText}>View requests</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f5]}>
              <View style={[homeStyles.icon, homeStyles.icon2]}>
                <Icon style={homeStyles.featureIcon} name="dots-triangle" />
              </View>
              <Text style={homeStyles.title}>Leaderboard</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action2]}>
                <Text style={homeStyles.actionText}>Participation to win</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[homeStyles.button, homeStyles.f5]}>
              <View style={[homeStyles.icon, homeStyles.icon2]}>
                <Icon style={homeStyles.featureIcon} name="dots-triangle" />
              </View>
              <Text style={homeStyles.title}>Leaderboard</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action2]}>
                <Text style={homeStyles.actionText}>Participation to win</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f6]}>
              <View style={[homeStyles.icon, homeStyles.icon2]}>
                <Icon style={homeStyles.featureIcon} name="dots-triangle" />
              </View>
              <Text style={homeStyles.title}>Leaderboard</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action2]}>
                <Text style={homeStyles.actionText}>Participation to win</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>

  );

}

