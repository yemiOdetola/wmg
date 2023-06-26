import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, shallowEqual } from 'react-redux';
import DrawerNavigation from './DrawerNavigation'
import GuestNavigation from './GuestNavigation'

const AppStack = createNativeStackNavigator()

export const NavigationControl = () => {
  const { token } = useSelector(
    (state: any) => ({
      token: state.auth.token
    }),
    shallowEqual
  );
  return (
    <>
      {token ? < DrawerNavigation />
        : <GuestNavigation />
      }
    </>
  )
}