import React, { useState, useEffect, useMemo } from 'react';
// import './src/utils/ConfigFirebase';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SplashScreen from 'react-native-splash-screen'
import { LogBox, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider, MD2LightTheme as DefaultThemePaper, MD2DarkTheme as DarkThemePaper } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as DefaultThemeNav, DarkTheme as DarkThemeNav } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Loading } from './src/components/shared';
import { Preferences } from './src/context';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import GuestNavigation from './src/navigation/GuestNavigation';
import { colors } from './src/utils';
import { config } from './src/utils';

DarkThemePaper.colors.primary = colors.PRIMARY;
DarkThemePaper.colors.accent = colors.PRIMARY;
DarkThemePaper.roundness = 6;

DefaultThemePaper.colors.primary = colors.PRIMARY;
DefaultThemePaper.colors.accent = colors.PRIMARY;
DefaultThemePaper.roundness = 6;
DefaultThemeNav.colors.background = "#fff";

LogBox.ignoreAllLogs();

// const auth = getAuth();


const App = () => {

  const [theme, setTheme] = useState(config.THEMEMODE);
  const [isLogged, setIsLogged] = useState(true);
  const [isReady, setIsReady] = useState(true);
  const [loaded, setLoaded] = useState(true);
  const [language, setLanguage] = useState(config.DEFAULTLANG);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    AsyncStorage.setItem('themeSetting', theme);
  }

  const preference = useMemo(
    () => ({
      toggleTheme, theme
    }),
    [theme],
  );

  // useEffect(() => {
  //   async function checkUser() {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user !== null) {
  //         setIsLogged(true);
  //         setLoaded(true);
  //       } else {
  //         setIsLogged(false);
  //         setLoaded(true);
  //       }
  //     })
  //   }
  //   checkUser();
  // }, []);


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

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadAssetsAsync}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  if (!loaded) {
    return (
      <Loading />
    );
  }

  if (loaded && isReady) {
    return (
      <Preferences.Provider value={preference}>
        <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper} settings={{ icon: props => <MaterialIcons {...props} />, }}>
          <StatusBar translucent backgroundColor="transparent" barStyle={theme === "dark" ? "light-content" : "dark-content"} />
          <NavigationContainer theme={theme === "dark" ? DarkThemeNav : DefaultThemeNav}>
            {isLogged ? <DrawerNavigation /> : <GuestNavigation />}
          </NavigationContainer>
        </PaperProvider>
      </Preferences.Provider>
    );
  }

};

export default App;