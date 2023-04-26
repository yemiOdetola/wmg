import React, { useState } from 'react';
import { SafeAreaView, View, Alert, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { styles } from '../../utils';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { usePreferences } from '../../hooks';

// const auth = getAuth();

export default function Login(props: any) {
  const { theme, toggleTheme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeScreen = (screen: string) => {
    console.log('string:::', screen);
    props.navigation.navigate(screen);
  };

  const login = async () => {

    setLoading(true);
    props.navigation.navigate('Main');

    // if (email, password) {
    //     await signInWithEmailAndPassword(auth, email, password)
    //         .then(() => {
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             if (errorCode === 'auth/wrong-password') {

    //                 setLoading(false);
    //                 Alert.alert(Strings.ST113);

    //             }
    //             else if (errorCode === 'auth/user-not-found') {

    //                 setLoading(false);
    //                 Alert.alert(Strings.ST37);

    //             }
    //             else {
    //                 setLoading(false);
    //                 Alert.alert(Strings.ST33);
    //             }

    //         });
    // } else {
    //     setLoading(false);
    //     Alert.alert(Strings.ST33);
    // }
  }

  return (


    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={styles.AuthLogo} />

      <View style={styles.AuthContent}>
        <TextInput label="Name" onChangeText={text => setEmail(text.trim())} mode="flat" autoCapitalize="none" style={styles.AuthInput} />
        <TextInput label="Email" onChangeText={text => setPassword(text)} mode="flat" secureTextEntry={true} style={styles.AuthInput} />
        <TouchableOpacity activeOpacity={0.7} onPress={() => onChangeScreen('forgotPassword')}>
          <Text style={styles.ForgotPass}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={() => login()} dark={theme === "dark" ? false : true}
          style={styles.AuthButton} contentStyle={styles.AuthButtonContent} labelStyle={styles.AuthButtonLabel}>
          {!loading ? "Continue" : "Please Wait..."}
        </Button>

        <View style={styles.AuthBottomContent}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('register')}>
            <Text style={styles.AuthBottomText}>
              Don't have an account?
              <Text style={{ fontWeight: 'bold' }}> Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>


  );
}
