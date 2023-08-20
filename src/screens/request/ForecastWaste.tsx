import React, { Fragment, useEffect, useState } from 'react';
import { View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, List, Divider, Chip, RadioButton, Modal, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { colors, styles } from '../../utils';
import { usePreferences } from '../../hooks';
import { fetchMyRequests } from '../../redux/actions/listing';
// import { runPrediction } from '../../redux/actions/listing';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import reqstyles from './reqstyles';
import { InnerLoading } from '../../components/shared';
import axios from 'axios';
import { Loading } from '../../redux/actions/ui';
import state from '../../redux/root.store';

const lcdas = [
  { id: 'Ajuwon', key: 'Ajuwon' },
  { id: 'ojokoro', key: 'ojokoro' },
  { id: 'Fagba', key: 'Fagba' },
  { id: 'Iju-Ogundimu', key: 'Iju-Ogundimu' },
  { id: 'Ifako', key: 'Ifako' },
  { id: 'Pen Cinema', key: 'Pen Cinema' },
  { id: 'Ogba-Ijaiye', key: 'Ogba-Ijaiye' },
  { id: 'Iju-Isaga', key: 'Iju-Isaga' },
]

const headers = {
  Authorization: `Bearer ${state.getState().auth.token}`,
};

export default function ForecastWaste(props: any) {
  const { theme } = usePreferences();
  const { navigation }: any = props;
  const dispatch: any = useDispatch();
  const [expanded, setExpanded] = React.useState(true);
  const [result, setResult] = useState(0);
  const [pickerState, togglePicker] = useState(false);
  const [selectedDate, setDate] = useState(new Date())
  const [preferenceModalVisible, setPreferenceModalVisible] = useState(false);
  const [preference, setPreference] = useState('');
  const [list, setList] = useState({});

  const hideModal = () => setPreferenceModalVisible(false);
  const handlePress = () => setExpanded(!expanded);

  const { loading, user, myListing, myPrediction } = useSelector(
    (state: any) => ({
      loading: state.ui.loading,
      user: state.auth.user,
      myListing: state.listing.myListing,
      myPrediction: state.listing.myPrediction,
    }),
    shallowEqual
  );

  useEffect(() => {
    setResult(0);
  }, []);

  function runPrediction(payload: any) {
    return (dispatch: any) => {
      dispatch(Loading(true));
      return axios
        .post(`http://127.0.0.1:3000/v1/listing/new-waste`, payload, { headers })
        .then((res: any) => {
          dispatch(Loading(false));
          console.log('res.data::: ', res.data);
          setResult(res?.data?.result?.data);
          setList(res?.data?.result?.list)
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

  const predictWaste = () => {
    if (preference) {
      const payload = {
        date: selectedDate.toLocaleDateString(),
        lcda: preference,
        settlement: 'HA_42010_302695',
        lcda_code: '114008',
        list: list,
      }
      dispatch(runPrediction(payload)).then((res: any) => {
        props.navigation.navigate('Home');
      })
    }
  }

  // function fetchMyRequests(payload: any) {
  //   return (dispatch: any) => {
  //     dispatch(Loading(true));
  //     return axios
  //       .post(`http://127.0.0.1:3000/v1/listing/my-listing`, payload, { headers })
  //       .then(res => {
  //         const data = res?.data;
  //         dispatch({});
  //         return res;
  //       })
  //       .catch(error => {
  //         Toast.show({
  //           type: 'error',
  //           text1: error?.message || 'Some error occured',
  //           position: 'bottom',
  //         });
  //         dispatch(Loading(false));
  //       });
  //   };
  // }

  const onDateChange = (event: any, selected: any) => {
    if (selected) {
      setDate(selected);
    }
    togglePicker(!pickerState)
  };


  console.log('mylsisosid', myPrediction);

  return (
    <>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
          <Text style={styles.formSubTitle}>Setup Prediction</Text>
          <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => setPreferenceModalVisible(true)}>
            <Text style={styles.ddLabel}>{preference ? `Choose location: ${preference}` : " Choose location"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => togglePicker(!pickerState)}>
            <Text style={styles.ddLabel}>{selectedDate ? `Date: ${selectedDate.toLocaleDateString()}` : "Select date"}</Text>
          </TouchableOpacity>
          {pickerState
            ? <DateTimePicker
              style={{ opacity: 1, backgroundColor: 'transparent' }}
              value={selectedDate} minimumDate={new Date()}
              placeholderText="select date"
              onChange={onDateChange}
            />
            : null}
          <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => predictWaste()} disabled={loading}
            style={styles.AuthButton} contentStyle={styles.AuthButtonContent} labelStyle={styles.AuthButtonLabel}>
            {!loading ? "Continue" : "Please wait..."}
          </Button>
          {loading ? <InnerLoading /> : null}

          {result ? <View style={styles.mt24}>
            <Text style={styles.formSubTitle}>forecasted waste for {preference}: {result.toFixed(2)}</Text>
          </View>
            : null}
        </SafeAreaView>
      </ScrollView>
      <Modal visible={preferenceModalVisible} onDismiss={hideModal}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <RadioButton.Group
          onValueChange={value => setPreference(value)}
          value={preference}
        >
          {lcdas.map((pref, index) => (
            <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => setPreference(pref.key)}>
              <RadioButton
                key={`pref-${index}`}
                value={pref.key}
                color={colors.PRIMARY}
                status={preference === pref.key ? 'checked' : 'unchecked'}
              />
              <Text>{pref.key}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
        <Button onPress={hideModal}>OK</Button>
      </Modal>
    </>
  );
}

