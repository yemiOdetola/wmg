import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { Heading } from '../../components/shared';
import { PostTags, FeaturedPosts, LatestPosts, Posts } from '../../components/listing';
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
          <Heading title="Tags" button={() => onChangeScreen('tags')} />
          <PostTags />
          <Posts />
          <FeaturedPosts />


          <Heading title="Posts" button={() => onChangeScreen('posts')} />
          <LatestPosts />

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


