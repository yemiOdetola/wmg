import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, SafeAreaView, I18nManager, TouchableOpacity } from 'react-native';
import { map } from 'lodash';
import { List } from 'react-native-paper';
import { getExercisesByMuscle } from "../../utils/api";
import { InnerLoading, LoadMoreButton, NoContentFound } from '../../components/shared';
import { styles, colors } from '../../utils';

export default function SingleExercise(props: any) {

  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);


  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";


  const onClickItem = (id: number, title: string) => {
    navigation.navigate('exercisedetails', { id, title });
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page + 1);

    getExercisesByMuscle(id, page + 1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      } else {
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <View style={{ marginTop: 30 }}>
        <LoadMoreButton
          Indicator={loading}
          showButton={showButton}
          Items={items}
          Num={8}
          Click={() => loadMore()} />
      </View>
    )
  }

  useEffect(() => {

    props.navigation.setOptions({
      title: title
    });

  }, []);

  useEffect(() => {
    getExercisesByMuscle(id, 0).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {

    return (
      <InnerLoading />
    );

  } else {

    return (

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <SafeAreaView>

          <View style={styles.ContentScreen}>

            {map(items, (item, i) => (

              <TouchableOpacity key={i} activeOpacity={1} onPress={() => onClickItem(item.id, item.title)}>
                <List.Item
                  key={i}
                  title={item.title}
                  titleStyle={{ fontWeight: 'bold', fontSize: 15, marginBottom: 3 }}
                  description={item.level}
                  titleNumberOfLines={2}
                  underlayColor="transparent"
                  rippleColor="transparent"
                  left={props => <View style={styles.itemListView2}><Image source={{ uri: item.image }} style={styles.itemListImage2} resizeMode={"center"} /></View>}
                  right={props => <List.Icon {...props} icon={rightIcon} style={{ alignSelf: 'center' }} color={colors.PRIMARY} />}
                />
              </TouchableOpacity>

            ))}

            {renderButton()}

            <NoContentFound data={items} />

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


