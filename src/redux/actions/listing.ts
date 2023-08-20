import * as Types from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as config from '../config.json';
import {Loading} from './ui';
import state from '../root.store';

const headers = {
  Authorization: `Bearer ${state.getState().auth.token}`,
};

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
    return axios
      .post(`${config.base_url}/listing/`, payload, {headers})
      .then(res => {
        dispatch(Loading(false));
        return res?.data;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.message || 'Some error occured',
          position: 'bottom',
        });
        dispatch(Loading(false));
      });
  };
}

export function runPrediction(payload: any) {
  return (dispatch: any) => {
    dispatch(Loading(true));
    return axios
      .post(`${config.base_url}/listing/new-waste`, payload, {headers})
      .then((res: any) => {
        dispatch({type: Types.MY_PREDICTION, data: res?.data?.result});
        dispatch({type: Types.MY_PREDICTION, data: res?.data?.result});
        dispatch(Loading(false));
        return res?.data;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.message || 'Some error occured',
          position: 'bottom',
        });
        dispatch(Loading(false));
      });
  };
}

export function fetchMyRequests(payload: any) {
  return (dispatch: any) => {
    dispatch(Loading(true));
    return axios
      .post(`${config.base_url}/listing/my-listing`, payload, {headers})
      .then(res => {
        const data = res?.data;
        dispatch({type: Types.MY_REQUESTS, data});
        dispatch(Loading(false));
        dispatch({});
        return res;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.message || 'Some error occured',
          position: 'bottom',
        });
        dispatch(Loading(false));
      });
  };
}

export function fetchRequestsAHP() {
  return (dispatch: any) => {
    dispatch(Loading(true));
    return axios
      .get(`${config.base_url}/listing/ahp`, {headers})
      .then(res => {
        const data: any = res?.data;
        console.log('action?.data?.cranked: ', data);
        const cranked = data?.rankedData.sort(
          (a: any, b: any) => b.score - a.score,
        );
        console.log('action?.data?.cranked: ', cranked);
        dispatch({
          type: Types.REQUESTS_AHP,
          cranked: cranked,
          rankedItems: data?.rankedItems,
        });
        dispatch(Loading(false));
        return res;
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error?.message || 'Some error occured',
          position: 'bottom',
        });
        dispatch(Loading(false));
      });
  };
}
