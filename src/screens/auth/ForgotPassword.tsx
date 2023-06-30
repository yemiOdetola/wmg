import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Input } from '../../components/shared'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../../utils';
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
  };

  return (
    <SafeAreaView style={[styles.AuthPage, { flex: 1, justifyContent: 'center' }]}>
      <View style={styles.AuthContent}>
        {/* <Text style={{ marginBottom: 40, fontSize: 16, textAlign: 'center' }}>Please enter your email, we'll send a verification token.</Text> */}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={"handled"}
          enableResetScrollToCoords={false}>
          <Input
            label="Email"
            onChangeText={(text: any) => setEmail(text)}
            mode="outlined"
            autoCapitalize="none"
            style={styles.AuthInput} />

          <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => resetPassword()}
            style={styles.AuthButton} contentStyle={styles.AuthButtonContent}>
            {!loading ? 'Reset Password' : 'Loading...'}
          </Button>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
