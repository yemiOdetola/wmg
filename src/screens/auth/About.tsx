import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, useWindowDimensions } from 'react-native';
import { styles } from '../../utils';
import { Loading } from '../../components/shared';
import { Text } from 'react-native-paper';
import { usePreferences } from '../../hooks';

export default function About() {

  const { width } = useWindowDimensions();
  const { theme } = usePreferences();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState('');

  useEffect(() => {

    setTimeout(() => {
      setIsLoaded(true);
    }, 1500)

  }, []);

  if (isLoaded) {

    return (

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.PageScreen}>
          <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={styles.PageLogo} />
          <Text>About DOUBLE-YOU HEM-GEE</Text>
        </View>
      </ScrollView>

    );

  } else {
    return (
      <Loading />
    );
  }

}

