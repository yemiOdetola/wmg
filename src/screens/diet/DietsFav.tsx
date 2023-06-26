import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, I18nManager, TouchableNativeFeedback } from 'react-native';
import { map } from 'lodash';
import { List, Avatar } from 'react-native-paper';
import { getFavDiets } from "../../utils/api";
import { InnerLoading, NoContentFound } from '../../components/shared';
import { styles } from '../../utils';

export default function DietsFav(props: any) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any>([]);

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (id: number, title: string) => {
    props.navigation.navigate('dietdetails', { id, title });
  };

  useEffect(() => {
    getFavDiets().then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, [items]);

  if (!isLoaded) {
    return (
      <InnerLoading />
    );
  }

  return (

    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >

      <SafeAreaView>

        <View style={styles.ContentScreen}>

          {map(items, (item, i) => (

            <TouchableNativeFeedback key={i} onPress={() => onClickItem(item.id, item.title)}>
              <List.Item
                key={i}
                title={item.title}
                titleStyle={{ fontWeight: 'bold', fontSize: 15, marginBottom: 3 }}
                titleNumberOfLines={2}
                underlayColor="transparent"
                rippleColor="transparent"
                left={props => <Avatar.Image size={70} style={{ marginRight: 10 }} source={{ uri: item.image }} />}
                right={props => <List.Icon {...props} icon="chevron-right" style={{ alignSelf: 'center', opacity: 0.3, marginBottom: 30 }} />}
              />
            </TouchableNativeFeedback>

          ))}

          <NoContentFound data={items} />

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


