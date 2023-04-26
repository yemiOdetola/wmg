import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { Title, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils';

export default function ExercisesLibrary() {

    const navigation: any = useNavigation();

    const onChangeScreen = (screen: string) => {
        navigation.navigate(screen);
    };

    return (

        <TouchableNativeFeedback onPress={() => onChangeScreen('exercises')}>
            <View style={{ flex: 1, marginHorizontal: 18, borderRadius: 8, marginBottom: 15 }}>
                <Card
                    style={{ justifyContent: 'center', alignItems: 'flex-start', width: '100%', height: 180, borderRadius: 8 }}>
                    <View style={{ paddingHorizontal: 18 }}>
                        <Title style={{ fontWeight: 'bold' }}>Exercises Library</Title>
                        <Text style={{ marginBottom: 15, opacity: 0.5 }}>Exercise Library offers a variety of movements to choose from!</Text>
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center',
                            backgroundColor: colors.PRIMARY, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8
                        }}>
                            <Text style={{ marginRight: 8, color: 'black', fontWeight: 'bold' }}>Browse</Text>
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableNativeFeedback>
    );
}