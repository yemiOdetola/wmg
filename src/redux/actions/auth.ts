import * as Types from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as config from '../config.json';
import {Loading} from './ui';
import state from '../root.store';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    console.log('save token error', e);
  }
};

export function register(payload: any) {
  return (dispatch: any) => {
    dispatch(Loading(true));
    return axios
      .post(`${config.base_url}/auth/register`, payload)
      .then(res => {
        const {user, token} = res?.data;
        storeToken(token?.access);
        dispatch({type: Types.AUTH, user, token: token.access});
        dispatch(Loading(false));
        return user;
      })
      .catch(error => {
        dispatch({type: Types.AUTH, user: {}});
        console.log('authh error:: ', error?.response?.data);

        Toast.show({
          type: 'error',
          text1: error.response.data.message || 'Invalid details',
        });
        dispatch(Loading(false));
        return error?.response?.data;
      });
  };
}

export function login(payload: any) {
  return (dispatch: any) => {
    dispatch(Loading(true));
    axios
      .post(`${config.base_url}/user/login`, payload)
      .then(res => {
        if (res.status === 200) {
          const {user, token} = res.data.data;
          if (res.data?.data?.pin_unavailable) {
            user.pin_unavailable = true;
          }
          dispatch({type: Types.AUTH, user, token});
          storeToken(token);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: 'Please retry your request',
            position: 'bottom',
          });
        }
        dispatch(Loading(false));
      })
      .catch(error => {
        dispatch({type: Types.AUTH, user: {}});
        console.log('error:: ', error);
        const {message} = error.data || error.response.data;
        if (message === 'Invalid phone number or password') {
          Toast.show({
            type: 'error',
            text1: 'Invalid details',
            text2: 'Invalid phone number or password',
            position: 'bottom',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: message,
            position: 'bottom',
          });
        }
        dispatch(Loading(false));
      })
      .finally(() => dispatch(Loading(false)));
  };
}

export function fetchUser() {
  const headers = {
    'Content-type': 'application/json',
    Accept: '*/*',
    Authorization: `Bearer ${state.getState().auth.token}`,
  };
  return (dispatch: any) => {
    dispatch(Loading(true));
    axios
      .get(`${config.base_url}/user`, {headers})
      .then(res => {
        if (res.status === 200) {
          const {user, wallet, beneficiaries} = res.data.data;
          if (res.data?.data?.pin_unavailable) {
            user.pin_unavailable = true;
          }
          dispatch({type: Types.USER, ...{user, wallet, beneficiaries}});
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Please retry your request',
            position: 'bottom',
          });
        }
        dispatch(Loading(false));
      })
      .catch(error => {
        console.log('error:: ', error);
        dispatch(Loading(false));
      });
  };
}
