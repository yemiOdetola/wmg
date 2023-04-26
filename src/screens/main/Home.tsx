import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Heading } from '../../components/shared';
import { LatestDiets, Levels, Goals, ExercisesLibrary, LatestWorkouts } from '../../components/home';
import { styles } from '../../utils';


export default function Home(props: any) {

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

          <Heading title="Latest Workouts" button={() => onChangeScreen('workouts')} />
          <LatestWorkouts />

          <Heading title="Workout By Goal" button={() => onChangeScreen('goals')} />
          <Goals />

          <Heading title="Workout By Level" button={() => onChangeScreen('levels')} />
          <Levels />
          <ExercisesLibrary />

          <Heading title="Latest Diets" button={() => onChangeScreen('diets')} />
          <LatestDiets />

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}

