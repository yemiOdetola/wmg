import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { Input } from '../../components/shared';
import { styles } from '../../utils';
import { usePreferences } from '../../hooks';
import { login } from '../../redux/actions/auth';

// const auth = getAuth();

export default function Login({ navigation }: any) {
  const { theme, toggleTheme } = usePreferences();
  const dispatch: any = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading } = useSelector(
    (state: any) => ({
      loading: state.ui.loading
    }),
    shallowEqual
  );

  const onChangeScreen = (screen: string) => {
    navigation.navigate(screen);
  };

  const signin = async () => {
    if (!email || !password) {
      return Toast.show({ type: 'error', text1: 'All fields is compulsory' })
    }
    const payload = {
      email: email,
      password: password,
    };
    dispatch(login(payload))
  }

  return (
    <SafeAreaView style={[styles.AuthPage, { flex: 1, justifyContent: 'center' }]}>
      <View style={styles.AuthContent}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={"handled"}
          enableResetScrollToCoords={false}>
          <Input
            label="Email address"
            value={email}
            onChangeText={(text: string) => setEmail(text.trim())}
            mode="outlined"
            autoCapitalize="none"
            style={styles.AuthInput}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            mode="outlined"
            secureTextEntry={true}
            style={styles.AuthInput}
          />
          <TouchableOpacity onPress={() => onChangeScreen('forgotPassword')}>
            <Text style={styles.ForgotPass}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button mode="contained" onPress={() => signin()} dark={theme === "dark" ? false : true}
            style={styles.AuthButton} contentStyle={styles.AuthButtonContent} labelStyle={styles.AuthButtonLabel}>
            {!loading ? "Continue" : "Please Wait..."}
          </Button>
        </KeyboardAwareScrollView>
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
