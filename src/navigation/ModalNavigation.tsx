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

  const buttonCloseLight = () => {
    return (
      <IconButton
        icon={'window-close'}
        iconColor={'#fff'}
        size={24}
        onPress={() => props.navigation.goBack()}
      />
    );
  };

  const buttonCloseColor = () => {
    return (
      <IconButton
        icon={'window-close'}
        iconColor={colors.PRIMARY}
        size={24}
        onPress={() => props.navigation.goBack()}
      />
    );
  };

  const buttonBack = () => {
    return (
      <IconButton
        icon={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
        size={24}
        onPress={() => props.navigation.goBack()}
      />
    );
  };

  const buttonBackToHome = () => {
    return (
      <IconButton
        icon={I18nManager.isRTL ? 'arrow-right' : 'arrow-left'}
        style={{ marginLeft: 15 }}
        size={24}
        onPress={() => props.navigation.navigate('home')}
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
      {/* <RootStack.Screen
        name="listingDetails"
        component={ListingDetails}
        options={{
          headerTransparent: true,
          title: "",
          headerLeft: () => ButtonClose(),
        }}
      /> */}
      {/* <RootStack.Screen
        name="productdetails"
        component={ProductDetails}
        options={{
          headerTransparent: true,
          title: null,
          headerLeft: () => ButtonClose(),
        }}
      /> */}
      {/* <RootStack.Screen
        name="postdetails"
        component={PostDetails}
        options={{
          headerTransparent: true,
          title: null,
          headerLeft: () => ButtonClose(),
        }}
      /> */}
      {/* <RootStack.Screen
        name="player"
        component={Player}
        options={{ headerTransparent: true, title: null }}
      /> */}
      {/* <RootStack.Screen
        name="timer"
        component={Timer}
        options={{ headerTransparent: true, title: null, headerLeft: null }}
      /> */}
      {/* <RootStack.Screen
        name="singleday"
        component={SingleDay}
        options={{ title: null, headerLeft: () => buttonClose() }}
      /> */}
      {/* <RootStack.Screen
        name="completed"
        component={Completed}
        options={{ headerTransparent: true, title: null, headerLeft: null }}
      /> */}
    </RootStack.Navigator>
  );
}
