import React, { useState } from 'react';
import { View, ScrollView, I18nManager } from 'react-native';
import { RadioButton, Switch, Paragraph, List } from 'react-native-paper';
import { map } from 'lodash';
import { styles } from '../../utils';
// import * as Updates from 'expo-updates';
import { CustomModal } from '../../components/shared';
import { usePreferences } from '../../hooks';

export default function Settings(props: any) {

  const { navigation } = props;
  const [modal, showModal] = useState(false);
  const { theme, toggleTheme } = usePreferences();

  return (

    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <CustomModal isVisible={modal} modalText="Please Wait..." showIndicator={true} />
      <View style={styles.ContentScreen}>

        <List.Item
          title="Language"
          titleStyle={{ fontWeight: 'bold' }}
          style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: theme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        />

        <List.Item
          title="Theme"
          titleStyle={{ fontWeight: 'bold' }}
          style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: theme === "dark" ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        />

        <View style={styles.switchRow}>
          <Paragraph>Dark Mode</Paragraph>
          <Switch value={theme === "dark" ? true : false} onValueChange={toggleTheme} />
        </View>

      </View>
    </ScrollView>

  );

}

