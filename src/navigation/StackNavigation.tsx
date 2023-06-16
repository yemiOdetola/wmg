import React from 'react';
import { I18nManager } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { usePreferences } from '../hooks';
import { Home } from '../screens/home';
import { SingleGoal, Workouts } from '../screens/workout';
import { Store } from '../screens/store';
import { Settings } from '../screens/settings';
import { Profile } from '../screens/profile';
import { Listing, ListingDetails } from '../screens/listing'
import { Diets } from '../screens/diet'
import { Exercises, SingleExercise } from '../screens/exercises'
import { MapMain } from '../screens/map';
import { RequestPickup, MyRequests } from '../screens/request';

// import Profile from '../screens/Profile';
// import About from '../screens/About';
// import Terms from '../screens/Terms';
// import Workouts from '../screens/Workouts';
// import Goals from '../screens/Goals';
// import Languages from '../languages';
// import LanguageContext from '../languages/LanguageContext';
// import Levels from '../screens/Levels';
// import SingleGoal from '../screens/SingleGoal';
// import SingleLevel from '../screens/SingleLevel';
// import SearchWorkout from '../screens/SearchWorkout';
// import Exercises from '../screens/Exercises';
// import SingleEquipment from '../screens/SingleEquipment';
// import SingleMuscle from '../screens/SingleMuscle';
// import Diets from '../screens/Diets';
// import Categories from '../screens/Categories';
// import SingleCategory from '../screens/SingleCategory';
// import Store from '../screens/Store';
// import Products from '../screens/Products';
// import Blog from '../screens/Blog';
// import Posts from '../screens/Posts';
// import SingleType from '../screens/SingleType';
// import SingleTag from '../screens/SingleTag';
// import Favorites from '../screens/Favorites';
// import CustomWorkouts from '../screens/CustomWorkouts';
// import CustomDiets from '../screens/CustomDiets';

const Stack = createNativeStackNavigator();

export default function StackNavigation(props: any) {
  const { theme } = usePreferences();

  const { navigation } = props;

  const navigatorOptions: any = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
    headerTitleAlign: 'center',
  };

  // ******************************** Buttons

  const buttonBack = () => {
    return (
      <IconButton
        icon={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
        size={24}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const buttonSearch = () => {
    return (
      <IconButton
        icon="magnify"
        size={24}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const buttonMenu = () => {
    return (
      <IconButton
        icon="menu"
        size={24}
        onPress={() => navigation.openDrawer()}
      />
    );
  };

  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: "MSW", headerLeft: () => buttonMenu() }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ title: "User Profile", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ title: "Settings", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="listing"
        component={Listing}
        options={{ title: "Listing", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singlegoal"
        component={SingleGoal}
        options={{ title: '', headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="workouts"
        component={Workouts}
        options={{ title: "Workouts", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="store"
        component={Store}
        options={{ title: "Store", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="diets"
        component={Diets}
        options={{ title: "Diets", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="exercises"
        component={Exercises}
        options={{ title: "Exercises", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="singleExercise"
        component={SingleExercise}
        options={{ title: "", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="mapmain"
        component={MapMain}
        options={{ title: "", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="requestPickup"
        component={RequestPickup}
        options={{ title: "", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="myRequests"
        component={MyRequests}
        options={{ title: "", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="listingDetails"
        component={ListingDetails}
        options={{
          headerTransparent: true,
          title: "",
          headerLeft: () => buttonBack(),
        }}
      />
    </Stack.Navigator>
  );
}
