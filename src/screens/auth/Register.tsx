import React, { Fragment, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Checkbox, Chip, Divider, RadioButton, Modal } from 'react-native-paper';
import { styles } from '../../utils';
import { colors } from '../../utils';
import { usePreferences } from '../../hooks'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// const auth = getAuth();

export default function Register(props: any) {
  const { theme } = usePreferences();
  const [preferences] = useState(['Distance', 'Quantity of waste', 'Accessibility', 'Price', 'Availability']);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [threshold, setThreshold] = useState('');
  const [radius, setRadius] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [userType, setUserType] = useState<any>('household');
  const [preferenceModalVisible, setPreferenceModalVisible] = React.useState(false);

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const register = async () => {
    console.log('register account')
    setTimeout(() => {
      setLoading(false);
    }, 300)
    // if (email, password, checked != false) {
    //   const errorHandler = ((e) => {
    //     if (e.code == 'auth/email-already-in-use') {
    //       setLoading(false);
    //       Alert.alert(Strings.ST104, Strings.ST36);

    //     } else {
    //       setLoading(false);
    //       Alert.alert(Strings.ST104, Strings.ST33);
    //     }

    //   })
    //   await createUserWithEmailAndPassword(auth, email, password).then(() => {
    //     updateProfile({
    //       displayName: name ? name : '',
    //     }).then(() => {
    //       setLoading(false);
    //     }).catch(errorHandler);

    //   }).catch(errorHandler)
    // } else {
    //   setLoading(false);
    //   Alert.alert(Strings.ST104, Strings.ST33);
    // }
  }

  const selectUserType = (type: string) => {
    setUserType(type || 'household')
  }

  const showModal = () => {
    setPreferenceModalVisible(true)
  };
  const hideModal = () => setPreferenceModalVisible(false);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView style={styles.AuthPage}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.AuthContent}>
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
          <TextInput
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            mode="flat"
            style={styles.AuthInput}
          />
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={text => setEmail(text.trim())}
            mode="flat"
            autoCapitalize="none"
            style={styles.AuthInput}
          />
          {userType === 'recycler'
            ? <Fragment>
              <TextInput
                label="Recycling company"
                value={company}
                onChangeText={text => setCompany(text.trim())}
                mode="flat"
                autoCapitalize="none"
                style={styles.AuthInput}
              />
              <TextInput
                label="Threshold (kg)"
                value={threshold}
                onChangeText={text => setThreshold(text.trim())}
                mode="flat"
                keyboardType="numeric"
                autoCapitalize="none"
                style={styles.AuthInput}
              />
              <TouchableOpacity style={styles.dropdownPlaceholder} onPress={showModal}>
                <Text style={styles.ddLabel}>{preference ? `Preference: ${preference}` : "Pickup preference"}</Text>
              </TouchableOpacity>

              {preference.toLowerCase() == 'distance' ?
                <TextInput
                  label="Distance (in km)"
                  value={radius}
                  onChangeText={text => setRadius(text.trim())}
                  mode="flat"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  style={styles.AuthInput}
                />
                : null}
            </Fragment>
            : null}

          <TextInput
            label="Phone number"
            value={phone}
            onChangeText={text => setPhone(text.trim())}
            mode="flat"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
            style={styles.AuthInput}
          />
          <TextInput
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={text => setPassword(text.trim())}
            mode="flat"
            style={styles.AuthInput}
          />
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Checkbox.Android
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

        </KeyboardAvoidingView>
      </ScrollView>
      <Modal visible={preferenceModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainerStyle}>
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
    </SafeAreaView>

  );
}
