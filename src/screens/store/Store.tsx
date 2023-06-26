import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { styles } from '../../utils';
import { Heading } from '../../components/shared';
import { FeaturedProducts, LatestProducts, ProductTypes } from '../../components/store';

export default function Store(props: any) {

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

          <Heading title="Special Offers" />
          <FeaturedProducts />

          <Heading title="Categories" button={() => onChangeScreen('types')} />
          <ProductTypes />

          <Heading title="Latest Products" button={() => onChangeScreen('products')} />
          <LatestProducts />

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}


