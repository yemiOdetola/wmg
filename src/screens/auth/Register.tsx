import React, { Fragment, useCallback, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button, Checkbox, Chip, RadioButton, Modal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import RangeSlider from 'rn-range-slider';
import Toast from 'react-native-toast-message';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from '../../components/shared';
import { styles, colors, config } from '../../utils';
import { usePreferences } from '../../hooks'
import { Thumb, Rail, RailSelected, Label } from './meta';
import { register } from '../../redux/actions/auth';


const categories = ['generic', 'paper', 'glass', 'textitle', 'furniture', 'e-waste', 'batteries', 'plastic'];

export default function Register(props: any) {
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
  const [password, setPassword] = useState('');
  const [distanceValue, setDistanceValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState<any>([]);
  const [userType, setUserType] = useState<any>('household');
  const [preferenceModalVisible, setPreferenceModalVisible] = useState(false);
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
  const [secPreferenceModalVisible, setSecPreferenceModalVisible] = useState(false);
  const [tetPreferenceModalVisible, setTetPreferenceModalVisible] = useState(false);

  const { loading } = useSelector(
    (state: any) => ({
      loading: state.ui.loading
    }),
    shallowEqual
  );


  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const hideModal = () => setPreferenceModalVisible(false);
  const hideSecModal = () => setSecPreferenceModalVisible(false);
  const hideTetModal = () => setTetPreferenceModalVisible(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value: any) => {
    setDistanceValue(value || 0)
    return <Label text={value || 0} />
  }, []);

  const selectUserType = (type: string) => {
    setUserType(type || 'household')
  }

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
    console.log('PLACES DETAILS', details?.formatted_address, details?.geometry?.location);
    //details?.geometry?.location.lat, details?.geometry?.location.lng
  }



  const createAccount = () => {
    if (!name || !email || !password || !phone) {
      return Toast.show({ type: 'error', text1: 'All fields is compulsory', position: 'bottom' })
    }
    const payload: any = {
      name: name,
      email: email,
      phone: phone,
      avatar: `https://avatars.dicebear.com/api/avataaars/${generateRandomNumbers() || '1805'}.svg`,
      password: password,
      address: {},
      role: "user"
    };
    if (userType == 'recycler') {
      if (!company || !threshold || !categories || !preference || !secPreference || !tetPreference) {
        return Toast.show({ type: 'error', text1: 'All fields are compulsory' });
      }
      payload.role = 'recycler';
      payload.company = company;
      payload.threshold = Number(threshold);
      payload.category = category;
      payload.distance = Number(distanceValue);
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
            // enableOnAndroid={true}
            keyboardShouldPersistTaps={"handled"}
            enableResetScrollToCoords={false}
          >
            {userType === 'recycler' ? <View style={styles.mt120} /> : null}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 16 }}>
              <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center' }}> Create Your Account</Text>
            </View>
            <View style={[styles.row, styles.my10, styles.itemCenter]}>
              <Text style={{ marginRight: 8 }}>Register as:</Text>
              <Chip onPress={() => selectUserType('household')} style={styles.chip} selected={userType === 'household'}>Household</Chip>
              <Chip onPress={() => selectUserType('recycler')} style={styles.chip} selected={userType === 'recycler'}>Recycler</Chip>
            </View>
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
            <Input
              secureTextEntry
              label="Password"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              mode="flat"
              style={styles.AuthInput}
            />
            {userType === 'recycler'
              ? <Fragment>
                <Text style={styles.formSubTitle}>Company's info</Text>
                <Input
                  label="Recycling company"
                  value={company}
                  onChangeText={(text: string) => setCompany(text)}
                  mode="flat"
                  autoCapitalize="none"
                  style={styles.AuthInput}
                />
                <View style={[styles.autoCompleteInput, {
                  borderBottomColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#ccc',
                  borderBottomWidth: 1,
                  backgroundColor: 'transparent',
                }]}>
                  <Text style={styles.autoCompleteInputLabel}>Type your company location</Text>
                  <GooglePlacesAutocomplete
                    placeholder="Type your company location"
                    query={{
                      key: config.google_key,
                      language: 'en',
                      region: 'NG',
                    }}
                    fetchDetails={true}
                    onPress={(data, details = null) => getPlacesLocation(details)}
                    onFail={error => console.log('error occured', error)}
                    onNotFound={() => console.log('no results')}
                  />
                </View>
                <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => setCategoriesModalVisible(true)}>
                  <Text style={styles.ddLabel}>{category ? `Select 3 Categories: ${category}` : "Category"}</Text>
                </TouchableOpacity>
                <Input
                  label="Minimum threshold (kg)"
                  value={threshold}
                  onChangeText={(text: string) => setThreshold(text.trim())}
                  mode="flat"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  style={styles.AuthInput}
                />

                <Text style={styles.formSubTitle}>Choose Pickup Preferences</Text>
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
                      onChangeText={(text: string) => setDistanceValue(text.trim())}
                      mode="flat"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      style={styles.AuthInput}
                    />
                    {/* <RangeSlider
                      // disableRange
                      min={0}
                      max={200}
                      step={1}
                      renderThumb={renderThumb}
                      renderRail={renderRail}
                      renderRailSelected={renderRailSelected}
                      renderLabel={renderLabel}
                    /> */}
                  </View>
                  : null}
              </Fragment>
              : null}
            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Checkbox
                color={colors.PRIMARY}
                uncheckedColor={colors.PRIMARY}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => { setChecked(!checked); }}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={() => onChangeScreen("terms")}>
                <Text style={styles.AuthCheckBoxLabel}>I Agree to Privacy & Terms</Text>
              </TouchableOpacity>
            </View>
            <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => createAccount()} disabled={loading}
              style={styles.AuthButton} contentStyle={styles.AuthButtonContent} labelStyle={styles.AuthButtonLabel}>
              {!loading ? "Continue" : "Please wait..."}
            </Button>
            <View style={styles.AuthBottomContent}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('login')}>
                <Text style={styles.AuthBottomText}>
                  Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {userType === 'recycler' ? <View style={styles.mb32} /> : null}
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
        {/* <RadioButton.Group
          onValueChange={value => setCategory(value)}
          value={category}
        > */}
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
        {/* </RadioButton.Group> */}
        <Button onPress={() => setCategoriesModalVisible(false)}>OK</Button>
      </Modal >
    </>
  );
}
