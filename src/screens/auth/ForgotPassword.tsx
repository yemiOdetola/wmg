import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { TextInput, Button, Text, IconButton } from 'react-native-paper';
import { styles } from '../../utils';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { usePreferences } from '../../hooks';

// const auth = getAuth();

export default function ForgotPassword(props: any) {

  const { theme, toggleTheme } = usePreferences();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const resetPassword = async () => {
    setLoading(true);
    console.log('reset password')
    setTimeout(() => {
      setLoading(false);
    }, 300)
    //   if (email) {
    //     sendPasswordResetEmail(auth, email).then(() => {
    //       setLoading(false);
    //       Alert.alert('Alert', Strings.ST38);
    //       props.navigation.navigate('login');

    //     }).catch((e) => {
    //       if (e.code == 'auth/user-not-found') {

    //         setLoading(false);
    //         Alert.alert(Strings.ST37);

    //       } else {

    //         setLoading(false);
    //         Alert.alert(Strings.ST104);
    //       }

    //     });
    //   } else {
    //     setLoading(false);
    //     Alert.alert(Strings.ST33);
    //   }
  };

  return (

    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.AuthPage}>
        <View style={styles.AuthContent}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <IconButton icon="cloud-lock-outline" size={24} />
            <Text style={{ alignSelf: 'center', fontSize: 16, textAlign: 'center' }}>We'll send you an email with a reset link</Text>
          </View>

          <TextInput
            label="Email"
            onChangeText={text => setEmail(text)}
            mode="outlined"
            autoCapitalize="none"
            style={styles.AuthInput} />

          <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => resetPassword()}
            style={styles.AuthButton} contentStyle={styles.AuthButtonContent}>
            {!loading ? 'Reset Password' : 'Loading...'}
          </Button>

        </View>
      </View>
    </SafeAreaView>

  );
}
