import React from 'react';
import { Button, Text } from 'react-native-paper';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Heading } from '../../components/shared';
import { LatestDiets, Levels, Goals, ExercisesLibrary, LatestWorkouts } from '../../components/home';
import { styles } from '../../utils';
import homeStyles from './homeStyles'

const featureMenu = [
  { id: 1, title: 'Weeee', buttonLabel: 'Waaaaa', buttonURL: 'weeoe', style: "button.f1" },
  { id: 2, title: 'Weeee', buttonLabel: 'Waaaaa', buttonURL: 'weeoe', style: "button.f2" },
  { id: 3, title: 'Weeee', buttonLabel: 'Waaaaa', buttonURL: 'weeoe', style: "button.f3" },
  { id: 4, title: 'Weeee', buttonLabel: 'Waaaaa', buttonURL: 'weeoe', style: "button.f4" },
]

export default function Home(props: any) {

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>

        <View style={styles.HomeScreen}>
          <View style={homeStyles.buttonGroup}>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f1]}>
              <View style={[homeStyles.icon, homeStyles.icon1]}>
                <Icon {...props} style={homeStyles.featureIcon} name="bus-stop" />
              </View>
              <Text style={homeStyles.title}>New Request</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action1]}>
                <Text style={homeStyles.actionText}>Request Pickup</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f3]}>
              <View style={[homeStyles.icon, homeStyles.icon3]}>
                <Icon {...props} style={homeStyles.featureIcon} name="calendar-month" />
              </View>
              <Text style={homeStyles.title}>Tracking</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action3]}>
                <Text style={homeStyles.actionText}>Track collector</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f4]}>
              <View style={[homeStyles.icon, homeStyles.icon4]}>
                <Icon {...props} style={homeStyles.featureIcon} name="database-cog-outline" />
              </View>
              <Text style={homeStyles.title}>View Requests</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action4]}>
                <Text style={homeStyles.actionText}>View requests</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[homeStyles.button, homeStyles.f2]}>
              <View style={[homeStyles.icon, homeStyles.icon2]}>
                <Icon {...props} style={homeStyles.featureIcon} name="delta" />
              </View>
              <Text style={homeStyles.title}>Leaderboard</Text>
              <Text style={homeStyles.subtitle}>I challenge you to install a different addon and see how it can be useful for you.</Text>
              <View style={[homeStyles.action, homeStyles.action2]}>
                <Text style={homeStyles.actionText}>Participation to win</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Heading title="Latest Workouts" button={() => onChangeScreen('workouts')} />
          <LatestWorkouts />

          <Heading title="Workout By Goal" button={() => onChangeScreen('goals')} />
          <Goals />

          <Heading title="Workout By Level" button={() => onChangeScreen('levels')} />
          <Levels />
          <ExercisesLibrary />

          <Heading title="Latest Diets" button={() => onChangeScreen('diets')} />
          <LatestDiets />

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}

