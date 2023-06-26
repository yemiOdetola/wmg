import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, ImageBackground, useWindowDimensions } from 'react-native';
import { Text, IconButton, List, Caption, Subheading } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HTMLView from 'react-native-render-html';
import usePreferences from '../../hooks/usePreferences';
import LinearGradient from 'react-native-linear-gradient';
import { getExercisesById } from "../../utils/api";
import { InnerLoading } from '../../components/shared';
import { styles, HTMLStylesDark, HTMLStyles, colors } from '../../utils';

export default function SingleExercise(props: any) {

  const { width } = useWindowDimensions();
  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;
  const { theme } = usePreferences();

  const [showInfo, setShowInfo] = useState(false);
  const [showInst, setShowInst] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState<any>({});

  const pressShowInfo = () => setShowInfo(!showInfo);
  const pressShowInst = () => setShowInst(!showInst);
  const pressShowTips = () => setShowTips(!showTips);

  const onPlay = (url: string, title: string) => {
    navigation.navigate('player', { url: url, title: title });
  };

  useEffect(() => {
    getExercisesById(id).then((response) => {
      setItem(response[0]);
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

          <View style={styles.ModalScreen}>

            <ImageBackground source={{ uri: item.image }} style={styles.ExerciseImage} resizeMode={'cover'} imageStyle={{ borderRadius: 8 }}>
              <View style={styles.ExerciseImageView}>
                <IconButton icon="play-circle" iconColor={colors.PRIMARY} size={38} style={{ marginLeft: 15, backgroundColor: 'rgba(0,0,0,0.30)' }}
                  onPress={() => onPlay(item.video, item.title)} />
              </View>
            </ImageBackground>

            <Text style={styles.ExerciseTitle}>{item.title}</Text>
            <Text style={styles.ExerciseSubTitle}>""</Text>

            <Grid style={{ marginTop: 20 }}>

              <Col style={styles.ExerciseCol}>
                <Icon name="backup-restore" style={styles.ExerciseColIcon} />
                <Text style={styles.ExerciseColTitle}>Reps</Text>
                <Text style={styles.ExerciseColSubTitle}>{item.reps}</Text>
              </Col>

              <Col style={styles.ExerciseCol}>
                <Icon name="checkbox-marked-circle-outline" style={styles.ExerciseColIcon} />
                <Text style={styles.ExerciseColTitle}>Sets</Text>
                <Text style={styles.ExerciseColSubTitle}>{item.sets}</Text>
              </Col>

              <Col style={styles.ExerciseCol}>
                <Icon name="timer-outline" style={styles.ExerciseColIcon} />
                <Text style={styles.ExerciseColTitle}>Rest</Text>
                <Text style={styles.ExerciseColSubTitle}>{item.rest}</Text>
              </Col>

            </Grid>


            <View style={{ marginVertical: 20, marginBottom: 10 }}>

              <List.Accordion
                title="Information"
                titleStyle={styles.ExerciseAccordionTitle}
                expanded={showInfo}
                style={styles.ExerciseAccordion}
                onPress={pressShowInfo}>
              </List.Accordion>

              {showInfo ?
                <View style={styles.ExerciseAccordionView}>
                  <Subheading>Level</Subheading>
                  <Caption style={styles.ExerciseInfoCaption}>{item.level}</Caption>

                  <Subheading>Muscle Involved</Subheading>
                  <Caption style={styles.ExerciseInfoCaption}>{item.bodyparts}</Caption>

                </View>
                : null
              }

            </View>


            <View style={{ marginBottom: 10 }}>

              <List.Accordion
                title="Instructions"
                titleStyle={styles.ExerciseAccordionTitle}
                expanded={showInst}
                style={styles.ExerciseAccordion}
                onPress={pressShowInst}>
              </List.Accordion>

              {showInst ?
                <View style={styles.ExerciseAccordionView}>
                  <HTMLView source={{ html: item.instructions ? item.instructions : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
                </View>
                : null
              }

            </View>


            <View style={{ marginBottom: 20 }}>

              <List.Accordion
                title="Tips"
                titleStyle={styles.ExerciseAccordionTitle}
                expanded={showTips}
                style={styles.ExerciseAccordion}
                onPress={pressShowTips}>
              </List.Accordion>

              {showTips ?
                <View style={styles.ExerciseAccordionView}>
                  <HTMLView source={{ html: item.tips ? item.tips : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
                </View>
                : null
              }

            </View>

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


