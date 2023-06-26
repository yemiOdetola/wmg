import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation'
import GuestNavigation from './GuestNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import state from '../redux/root.store';

const AppStack = createNativeStackNavigator();

export const NavigationControl = () => {

  console.log('STATE: ', state.getState());
  // useEffect(() => {
  //   async function checkUser() {
  //     await AsyncStorage.getItem('userLogin');
  //   }
  //   checkUser();
  // }, []);


  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {state.getState().auth.token ?
        <AppStack.Screen name='HomeMain' component={DrawerNavigation} />
        : null}
      {!state.getState().auth.token ?
        <AppStack.Screen name='Guest' component={GuestNavigation} />
        : null}
    </AppStack.Navigator>
  )
}