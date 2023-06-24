import React, { Fragment, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button, Checkbox, Chip, RadioButton, Modal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from '../../components/shared';
import { styles, colors } from '../../utils';
import { usePreferences } from '../../hooks'
import Toast from 'react-native-toast-message';

const categories = ['generic', 'paper', 'glass', 'textitle', 'furniture', 'e-waste', 'batteries', 'plastic'];

export default function Register(props: any) {
  const { theme } = usePreferences();
  const [preferences] = useState(['Distance', 'Quantity', 'Price', 'Availability', 'Waste Composition']);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('');
  const [secPreference, setSecPreference] = useState('');
  const [tetPreference, setTetPreference] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [threshold, setThreshold] = useState('');
  const [radius, setRadius] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [category, setCategory] = useState<any>([]);
  const [userType, setUserType] = useState<any>('household');
  const [preferenceModalVisible, setPreferenceModalVisible] = useState(false);
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
  const [secPreferenceModalVisible, setSecPreferenceModalVisible] = useState(false);
  const [tetPreferenceModalVisible, setTetPreferenceModalVisible] = useState(false);

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const register = async () => {
    console.log('register account')
    setTimeout(() => {
      setLoading(false);
    }, 300)
  }

  const selectUserType = (type: string) => {
    setUserType(type || 'household')
  }

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
      // Toast.show({ text1: 'You are only allowed to select 3 categories' })
    }
  }

  const hideModal = () => setPreferenceModalVisible(false);
  const hideSecModal = () => setSecPreferenceModalVisible(false);
  const hideTetModal = () => setTetPreferenceModalVisible(false);

  return (
    <>
      <SafeAreaView style={[styles.AuthContent, { flex: 1, justifyContent: 'center' }]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={"handled"}
          enableResetScrollToCoords={false}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ alignSelf: 'center', fontSize: 16, textAlign: 'center' }}> Create Your Account</Text>
          </View>
          {/* <Divider /> */}
          <View style={[styles.row, styles.my10, styles.itemCenter]}>
            <Text style={{ marginRight: 8 }}>Register as:</Text>
            <Chip onPress={() => selectUserType('household')} style={styles.chip} selected={userType === 'household'}>Household</Chip>
            <Chip onPress={() => selectUserType('recycler')} style={styles.chip} selected={userType === 'recycler'}>Recycler</Chip>
          </View>
          {/* <Divider /> */}
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
          {userType === 'recycler'
            ? <Fragment>
              <Text style={styles.formSubTitle}>Company's info</Text>
              <Input
                label="Recycling company"
                value={company}
                onChangeText={(text: string) => setCompany(text.trim())}
                mode="flat"
                autoCapitalize="none"
                style={styles.AuthInput}
              />
              <TouchableOpacity style={styles.dropdownPlaceholder} onPress={() => setCategoriesModalVisible(true)}>
                <Text style={styles.ddLabel}>{category ? `Select Category: ${category}` : "Category"}</Text>
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

              {preference.toLowerCase() == 'distance' || secPreference.toLowerCase() == 'distance' || tetPreference.toLowerCase() == 'distance' ?
                <Input
                  label="Distance (in km)"
                  value={radius}
                  onChangeText={(text: string) => setRadius(text.trim())}
                  mode="flat"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  style={styles.AuthInput}
                />
                : null}
              {preference.toLowerCase() == 'distance' || secPreference.toLowerCase() == 'distance' || tetPreference.toLowerCase() == 'distance' ?
                <Input
                  label="Distance (in km)"
                  value={radius}
                  onChangeText={(text: string) => setRadius(text.trim())}
                  mode="flat"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  style={styles.AuthInput}
                />
                : null}
            </Fragment>
            : null}

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
            onChangeText={(text: string) => setPassword(text.trim())}
            mode="flat"
            style={styles.AuthInput}
          />
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Checkbox
              color={colors.PRIMARY}
              uncheckedColor={"#b9b9b9"}
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => { setChecked(!checked); }}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => onChangeScreen("terms")}>
              <Text style={styles.AuthCheckBoxLabel}>I Agree to Privacy & Terms</Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => register()}
            style={styles.AuthButton} labelStyle={styles.authButtonLabel} contentStyle={styles.AuthButtonContent}>
            {!loading ? "Continue" : "Please wait..."}
          </Button>
          <View style={styles.AuthBottomContent}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('login')}>
              <Text style={styles.AuthBottomText}>
                Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView >
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
                color="#000"
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
                color="#000"
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
                color="#000"
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
