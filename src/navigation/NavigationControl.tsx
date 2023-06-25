import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigation from './DrawerNavigation'
import GuestNavigation from './GuestNavigation'

const AppStack = createNativeStackNavigator();

export const NavigationControl = () => {

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='HomeMain' component={DrawerNavigation} />
      <AppStack.Screen name='Guest' component={GuestNavigation} />
    </AppStack.Navigator>
  )
}