import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, Checkbox, Chip, RadioButton, Modal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from '../../components/shared';
import { styles, colors, config } from '../../utils';
import { usePreferences } from '../../hooks'
import { register } from '../../redux/actions/auth';
import { Loading } from '../../redux/actions/ui';


const categories = ['generic', 'paper', 'glass', 'textitle', 'furniture', 'e-waste', 'batteries', 'plastic'];

export default function EditProfile(props: any) {
  const dispatch: any = useDispatch();
  const { theme } = usePreferences();
  const [preferences] = useState(['Distance', 'Quantity', 'Price', 'Availability', 'Waste Composition']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('');
  const [secPreference, setSecPreference] = useState('');
  const [tetPreference, setTetPreference] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [threshold, setThreshold] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const [locationData, setLocationData] = useState<any>('');
  const [category, setCategory] = useState<any>([]);
  const [preferenceModalVisible, setPreferenceModalVisible] = useState(false);
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
  const [secPreferenceModalVisible, setSecPreferenceModalVisible] = useState(false);
  const [tetPreferenceModalVisible, setTetPreferenceModalVisible] = useState(false);

  const { loading, user } = useSelector(
    (state: any) => ({
      loading: state.ui.loading,
      user: state.auth.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(Loading(false));
    if (user?.name) setName(user.name);
    if (user?.email) setEmail(user.email);
    if (user?.phone) setPhone(user.phone);
    if (user?.preference && user?.preference.length > 0) {
      setPreference(user.preference[0])
      setSecPreference(user.preference[1])
      setTetPreference(user.preference[2])
    }
    if (user?.distance) setDistanceValue(`${user.distance}`);
  }, [])


  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const hideModal = () => setPreferenceModalVisible(false);
  const hideSecModal = () => setSecPreferenceModalVisible(false);
  const hideTetModal = () => setTetPreferenceModalVisible(false);


  const generateRandomNumbers: any = () => Math.floor(Math.random() * 10000);

  const updateCategory = (cat: any) => {
    const cloneCat: any = [...category];
    const currIdx = cloneCat.indexOf(cat);
    if (currIdx !== -1) {
      cloneCat.splice(currIdx, 1);
      setCategory(cloneCat);
    } else if (cloneCat.length < 3) {
      cloneCat.push(cat);
      setCategory(cloneCat);
    } else {
      Alert.alert('You can only select 3 categories')
    }
  }
  const getPlacesLocation = (details: any) => {
    setLocationData({
      coord: details?.geometry?.location,
      address: details?.formatted_address,
    })
  }

  const editAccount = () => {
    if (!name || !email || !phone) {
      return Toast.show({ type: 'error', text1: 'All fields is compulsory', position: 'bottom' })
    }
    const payload: any = {
      name: name,
      email: email,
      phone: phone,
      avatar: `https://avatars.dicebear.com/api/avataaars/${generateRandomNumbers() || '1805'}.svg`,
      role: "user"
    };
    if (user?.role == 'recycler') {
      if (!company || !threshold || !categories || !preference || !secPreference || !tetPreference || !locationData) {
        return Toast.show({ type: 'error', text1: 'All fields are compulsory' });
      }
      payload.role = 'recycler';
      payload.company = company;
      payload.threshold = Number(threshold);
      payload.category = category;
      payload.distance = Number(distanceValue);
      payload.location = locationData;
      payload.preference = [preference, secPreference, tetPreference];
    }
    dispatch(register(payload)).then((res: any) => {
      props.navigation.navigate('Home');
    })
  }

  return (
    <>
      <SafeAreaView style={[styles.AuthPage, { flex: 1, justifyContent: 'center' }]}>
        <View style={styles.AuthContent}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={"handled"}
            enableResetScrollToCoords={false}
          >
            <Input
              label="Name"
              value={name}
              onChangeText={(text: string) => setName(text)}
              mode="flat"
              style={styles.AuthInput}
            />
            <Input
              label="Email Address"
              value={email}
              onChangeText={(text: string) => setEmail(text.trim())}
              mode="flat"
              editable={false}
              autoCapitalize="none"
              style={styles.AuthInput}
            />
            <Input
              label="Phone number"
              value={phone}
              onChangeText={(text: string) => setPhone(text.trim())}
              mode="flat"
              keyboardType="name-phone-pad"
              autoCapitalize="none"
              style={styles.AuthInput}
            />
            {user?.role === 'recycler'
              ? <Fragment>
                <Text style={styles.formSubTitle}>Preferences</Text>
                <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => setPreferenceModalVisible(true)}>
                  <Text style={styles.ddLabel}>{preference ? `1. Most preferred: ${preference}` : "1. Most preferred"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => setSecPreferenceModalVisible(true)}>
                  <Text style={styles.ddLabel}>{secPreference ? `2. Preferred: ${secPreference}` : "2. Preferred"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => setTetPreferenceModalVisible(true)}>
                  <Text style={styles.ddLabel}>{tetPreference ? `3. Least Preferred: ${tetPreference}` : "3. Least Preferred"}</Text>
                </TouchableOpacity>

                {preference?.toLowerCase() == 'distance' || secPreference?.toLowerCase() == 'distance' || tetPreference?.toLowerCase() == 'distance' ?
                  <View style={styles.my16}>
                    <Text style={styles.RangeLabel}>Target coverage: {distanceValue || 0}km</Text>
                    <Input
                      label=""
                      value={distanceValue}
                      onChangeText={(text: string) => setDistanceValue(text)}
                      mode="flat"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      style={styles.AuthInput}
                    />
                  </View>
                  : null}
              </Fragment>
              : null}
            <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => editAccount()} disabled={loading}
              style={styles.AuthButton} contentStyle={styles.AuthButtonContent} labelStyle={styles.AuthButtonLabel}>
              {!loading ? "Continue" : "Please wait..."}
            </Button>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
      <Modal visible={preferenceModalVisible} onDismiss={hideModal}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <RadioButton.Group
          onValueChange={value => setPreference(value)}
          value={preference}
        >
          {preferences.map((pref, index) => (
            <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => setPreference(pref)}>
              <RadioButton
                key={`pref-${index}`}
                value={pref}
                color={colors.PRIMARY}
                status={preference === pref ? 'checked' : 'unchecked'}
              />
              <Text>{pref}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
        <Button onPress={hideModal}>OK</Button>
      </Modal>

      <Modal visible={secPreferenceModalVisible} onDismiss={hideSecModal}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <RadioButton.Group
          onValueChange={value => setSecPreference(value)}
          value={secPreference}
        >
          {preferences.map((secPref, index) => (
            <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => setSecPreference(secPref)}>
              <RadioButton
                key={`secPref-${index}`}
                value={secPref}
                color={colors.PRIMARY}
                status={secPreference === secPref ? 'checked' : 'unchecked'}
              />
              <Text>{secPref}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
        <Button onPress={hideSecModal}>OK</Button>
      </Modal>

      <Modal visible={tetPreferenceModalVisible} onDismiss={hideTetModal}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <RadioButton.Group
          onValueChange={value => setTetPreference(value)}
          value={tetPreference}
        >
          {preferences.map((tetPref, index) => (
            <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => setTetPreference(tetPref)}>
              <RadioButton
                key={`tetPref-${index}`}
                value={tetPref}
                color={colors.PRIMARY}
                status={tetPreference === tetPref ? 'checked' : 'unchecked'}
              />
              <Text>{tetPref}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
        <Button onPress={hideTetModal}>OK</Button>
      </Modal>

      <Modal visible={categoriesModalVisible} onDismiss={() => setCategoriesModalVisible(false)}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        {categories.map((cat: any, index) => (
          <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => updateCategory(cat)}>
            <Checkbox
              color={colors.PRIMARY}
              uncheckedColor={"#b9b9b9"}
              status={category.includes(cat) ? 'checked' : 'unchecked'}
              onPress={() => updateCategory(cat)}
            />
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
        <Button onPress={() => setCategoriesModalVisible(false)}>OK</Button>
      </Modal >
    </>
  );
}
