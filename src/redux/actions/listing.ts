import * as Types from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as config from '../config.json';
import {Loading} from './ui';
import state from '../root.store';

export const createListingTest = (payload: any) => (dispatch: any) => {
  dispatch(Loading(true));
  return axios.get('https://google.com').then(() => {
    dispatch(Loading(false));
    return payload;
  });
};

export function createListing(payload: any) {
  return (dispatch: any) => {
    dispatch(Loading(true));
    axios
      .post(`${config.base_url}/listing`, payload)
      .then(res => {
        if (res.status === 200) {
          dispatch(Loading(false));
        }
      })
      .catch(error => {
        dispatch({type: Types.AUTH, user: {}});
        console.log('error:: ', error);
        Toast.show({
          type: 'error',
          text1: 'Invalid details',
          text2: 'Email address or Phone number is already used',
          position: 'bottom',
        });
        dispatch(Loading(false));
      });
  };
}
