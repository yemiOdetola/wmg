import React, { useState } from 'react';
import { SafeAreaView, View, Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Checkbox, IconButton } from 'react-native-paper';
import { styles } from '../../utils';
import { colors } from '../../utils';
import { usePreferences } from '../../hooks'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// const auth = getAuth();

export default function Register(props: any) {
  const { theme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

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

  return (

    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.AuthPage}>

        <View style={styles.AuthContent}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            {/* <IconButton icon="account-plus" size={80} /> */}
            <Text style={{ alignSelf: 'center', fontSize: 16, textAlign: 'center' }}>Please enter info to create account</Text>
          </View>

          <TextInput label="Username" onChangeText={text => setName(text)} mode="flat" style={styles.AuthInput} />
          <TextInput label="Email Address" onChangeText={text => setEmail(text.trim())} mode="flat" autoCapitalize="none" style={styles.AuthInput} />
          <TextInput label="Password" onChangeText={text => setPassword(text.trim())} mode="flat" secureTextEntry={true} style={styles.AuthInput} />
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Checkbox.Android color={colors.PRIMARY} uncheckedColor={"#b9b9b9"} status={checked ? 'checked' : 'unchecked'}
              onPress={() => { setChecked(!checked); }}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => onChangeScreen("terms")}>
              <Text style={styles.AuthCheckBoxLabel}>I Agree to Privacy & Terms</Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => register()} style={styles.AuthButton} contentStyle={styles.AuthButtonContent}>
            {!loading ? "Continue" : "Please wait..."}
          </Button>

          <View style={styles.AuthBottomContent}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('login')}>
              <Text style={styles.AuthBottomText}>
                Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>

  );
}
