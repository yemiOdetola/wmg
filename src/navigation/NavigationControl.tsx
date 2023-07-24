import React from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import DrawerNavigation from './DrawerNavigation'
import GuestNavigation from './GuestNavigation'


export const NavigationControl = (props: any) => {
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