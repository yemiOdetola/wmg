import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import mapStyles from './mapStyles'


export default function MapMain() {
  return (
    <View style={mapStyles.container}>
      {/*Render our MapView*/}
      <MapView
        style={mapStyles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  )
}
