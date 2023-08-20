import React from 'react';
import { I18nManager } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { usePreferences } from '../hooks';
import { Home } from '../screens/home';
import { SingleGoal, Workouts } from '../screens/workout';
import { Store } from '../screens/store';
import { Settings } from '../screens/settings';
import { EditProfile, Profile } from '../screens/profile';
import { Listing, ListingDetails } from '../screens/listing'
import { Diets } from '../screens/diet'
import { Exercises, SingleExercise } from '../screens/exercises'
import { MapMain } from '../screens/map';
import { RequestPickup, MyRequests, PickupSchedule, ForecastWaste } from '../screens/request';

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
        options={{ title: "", headerLeft: () => buttonMenu() }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ title: "User Profile", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{ title: "Edit Your Profile", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ title: "Settings", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="listing"
        component={Listing}
        options={{ title: "Pickup Requests", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="mapmain"
        component={MapMain}
        options={{ title: "Listings Overview", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="requestPickup"
        component={RequestPickup}
        options={{ title: "Request For Pickup", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="myRequests"
        component={MyRequests}
        options={{ title: "Forecast Waste", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="forecastWaste"
        component={ForecastWaste}
        options={{ title: "Forecast Waste", headerLeft: () => buttonBack() }}
      />
      <Stack.Screen
        name="listingDetails"
        component={ListingDetails}
        options={{
          headerTransparent: true,
          title: "Listing Details",
          headerLeft: () => buttonBack(),
        }}
      />
      <Stack.Screen
        name="schedulePickup"
        component={PickupSchedule}
        options={{ title: "Schedule Pickup", headerLeft: () => buttonBack() }}
      />
    </Stack.Navigator>
  );
}
