import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { styles } from '../../utils';
import { Loading } from '../../components/shared';
import { usePreferences } from '../../hooks';
import { Text } from 'react-native-paper';

export default function Terms() {

  const { width } = useWindowDimensions();
  const { theme } = usePreferences();
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState('');

  useEffect(() => {
    // getStrings().then((response: any) => {
    //   setItem(response[0]);
    //   setIsLoaded(true);
    // });
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000)
  }, []);

  if (isLoaded) {

    return (

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.GuestPageScreen}>
            <Text>Terms and Conditions</Text>
          </View>
        </SafeAreaView>
      </ScrollView>

    );

  } else {
    return (
      <Loading />
    );
  }

}

