import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { Heading } from '../../components/shared';
import { PostTags, FeaturedPosts, LatestPosts, PickupRequests } from '../../components/listing';
import { styles } from '../../utils';

export default function Listings(props: any) {

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  return (

    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <View style={styles.HomeScreen}>
          <PickupRequests />
        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


