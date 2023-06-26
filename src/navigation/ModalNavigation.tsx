import React from 'react';
import { I18nManager } from 'react-native';
import { IconButton } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigation from './StackNavigation';

import { usePreferences } from '../hooks';
import { colors } from '../utils';
import { WorkoutDetails } from '../screens/workout';
import { DietDetails } from '../screens/diet'
import { ListingDetails } from '../screens/listing';
import { ExerciseDetails } from '../screens/exercises';


// import ExerciseDetails from '../screens/ExerciseDetails';
// import Player from '../screens/Player';
// import WorkoutDetails from '../screens/WorkoutDetails';
// import SingleDay from '../screens/SingleDay';
// import DietDetails from '../screens/DietDetails';
// import ProductDetails from '../screens/ProductDetails';
// import PostDetails from '../screens/PostDetails';
// import Timer from '../screens/Timer';
// import Completed from '../screens/Completed';

const RootStack = createNativeStackNavigator();

export default function ModalNavigation(props: any) {
  const { theme } = usePreferences();

  const ButtonClose = () => {
    return (
      <IconButton
        icon={'window-close'}
        size={24}
        onPress={() => props.navigation.goBack()}
      />
    );
  };

  const navigatorOptions: any = {
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
    headerTitleAlign: 'center',
    presentation: 'modal',
    gestureEnabled: false,
    /*cardOverlayEnabled: true,
    ...TransitionPresets.ModalPresentationIOS*/
  };

  return (
    <RootStack.Navigator
      screenOptions={route => {
        return navigatorOptions;
      }}>
      <RootStack.Screen
        name="main"
        component={StackNavigation}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="workoutdetails"
        component={WorkoutDetails}
        options={{
          headerTransparent: true,
          title: '',
          headerLeft: () => ButtonClose(),
        }}
      />
      <RootStack.Screen
        name="exercisedetails"
        component={ExerciseDetails}
        options={{ title: "Exercise details", headerLeft: () => ButtonClose() }}
      />
      <RootStack.Screen
        name="dietdetails"
        component={DietDetails}
        options={{
          headerTransparent: true,
          title: "",
          headerLeft: () => ButtonClose(),
        }}
      />
    </RootStack.Navigator>
  );
}
