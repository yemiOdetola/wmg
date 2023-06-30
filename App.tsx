import React, { useState, useEffect, useMemo } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { LogBox, PermissionsAndroid, StatusBar, Alert } from 'react-native';
import { Provider } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider, MD2LightTheme as DefaultThemePaper, MD2DarkTheme as DarkThemePaper } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as DefaultThemeNav, DarkTheme as DarkThemeNav } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import { NavigationControl } from './src/navigation/NavigationControl';
import { Loading } from './src/components/shared';
import { Preferences } from './src/context';
import { colors, config } from './src/utils';
import store from './src/redux/root.store';
import { NotificationListener, requestUserPermission } from './pushNotificationManager';

DarkThemePaper.colors.primary = colors.PRIMARY;
DarkThemePaper.colors.accent = colors.PRIMARY;
DarkThemePaper.roundness = 2;

DefaultThemePaper.colors.primary = colors.PRIMARY;
DefaultThemePaper.colors.accent = colors.PRIMARY;
DefaultThemePaper.roundness = 2;
DefaultThemeNav.colors.background = "#fff";

LogBox.ignoreAllLogs();

const App = () => {
  const [theme, setTheme] = useState(config.THEMEMODE);
  const [loaded, setLoaded] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission()
    NotificationListener()
  }, [])

  console.log('console.log(): ', store.getState());
  useEffect(() => {
    async function checkUser() {
      if (store.getState().auth.token) {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    async function checkTheme() {
      await AsyncStorage.getItem('themeSetting')
        .then(((value: any) => {
          if (value) {
            setTheme(value === "dark" ? "light" : "dark");
          }
        }));
    }
    checkTheme();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    AsyncStorage.setItem('themeSetting', theme);
  }

  const preference = useMemo(() => ({
    toggleTheme, theme
  }), [theme],);

  if (!loaded) {
    return (
      <Loading />
    );
  }

  if (loaded) {
    return (
      <>
        <Provider store={store}>
          <Preferences.Provider value={preference}>
            <PaperProvider
              theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper} settings={{ icon: props => <MaterialIcons {...props} />, }}>
              <StatusBar translucent backgroundColor="transparent" barStyle={theme === "dark" ? "light-content" : "dark-content"} />
              <NavigationContainer theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}>
                <NavigationControl />
              </NavigationContainer>
            </PaperProvider>
          </Preferences.Provider >
          <Toast />
        </Provider>
      </>
    );
  }

};

export default App;