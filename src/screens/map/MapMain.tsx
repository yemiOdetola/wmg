import React, { useState, useRef, useEffect } from 'react'
import { Platform, View, PermissionsAndroid, Animated, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, RadioButton, Modal, Text } from 'react-native-paper';
import mapStyles from './mapStyles'
import { mapViewConfig } from './mapViewConfig';
import { usePreferences } from '../../hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, styles } from '../../utils';

const markers = [
  { "latitude": 37.4220262, "longitude": -122.0840891 },
  { "latitude": 6.512996025012338, "latitudeDelta": 0.08336767617148677, "longitude": 3.3602561987936497, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.512994026339028, "latitudeDelta": 0.0833676765034852, "longitude": 3.3602561987936497, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.512994026339028, "latitudeDelta": 0.0833676765034852, "longitude": 3.3602561987936497, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.497873501997666, "latitudeDelta": 0.08337018534972529, "longitude": 3.3541625551879406, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.505940991779954, "latitudeDelta": 0.08336884748826456, "longitude": 3.3383613266050816, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.52310154857041, "latitudeDelta": 0.08336599619293672, "longitude": 3.32557724788785, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.526911594850771, "latitudeDelta": 0.08336536212395451, "longitude": 3.3194048143923283, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.526909596232937, "latitudeDelta": 0.08336536245665283, "longitude": 3.3194048143923283, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.526907597615103, "latitudeDelta": 0.08336536278937778, "longitude": 3.3194048143923283, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.539486407152286, "latitudeDelta": 0.08336326680402095, "longitude": 3.3180620335042477, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.551416380858428, "latitudeDelta": 0.08336127522063741, "longitude": 3.3223713375627995, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.550052056109019, "latitudeDelta": 0.08336150316329505, "longitude": 3.350300509482622, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.474559402168891, "latitudeDelta": 0.08337404232211743, "longitude": 3.3438135869801044, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.525662124045536, "latitudeDelta": 0.08336557010187562, "longitude": 3.375804964452982, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.533973328041524, "latitudeDelta": 0.08336418593349837, "longitude": 3.3576195873320103, "longitudeDelta": 0.043651945888996124 },
  { "latitude": 6.553423223837399, "latitudeDelta": 0.08336093984423787, "longitude": 3.358385358005762, "longitudeDelta": 0.043651945888996124 },
]

export default function MapMain() {
  const { theme }: any = usePreferences();
  const mapRef: any = useRef<any>();
  const anim = useRef(new Animated.Value(1));
  const [showDetails, setShowDetails] = useState(false)
  const [listingDetails, setListingDetails] = useState('');
  const [location, setLocation] = useState<any>({
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);


  useEffect(() => {
    console.log('LOCATION', location);
  }, [location]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    } else {
      Geolocation.requestAuthorization('whenInUse').then((result) => {
        if (result === 'granted') {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      }).catch((error) => {
        console.log('Error requesting location permission:', error);
      });
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.log('Error getting current location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const navTo = (loc: any, delay = null) => {
    if (!loc) return;
    const newCamera = {
      center: { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
      zoom: 17,
      heading: 0,
      pitch: 0,
      altitude: 5
    }
    if (delay) {
      setTimeout(() => {
        if (mapRef.current) mapRef.current.animateCamera(newCamera, { duration: 1000 });

      }, delay)
    } else {
      if (mapRef.current) mapRef.current.animateCamera(newCamera, { duration: 1000 });
    }
    AsyncStorage.setItem('location', JSON.stringify({ latitude: loc.coords.latitude, longitude: loc.coords.longitude }));
  }

  const showListingDetails = (marker: any) => {
    setListingDetails(marker);
    setShowDetails(true);
  }
  const CustomMarker = (marker: any) => {
    return (
      <Animated.View style={{ transform: [{ scale: anim.current }], padding: 24 }}>
        {/* <Icon name="archive-marker-outline" size={28} color="red" /> */}
        <Icon name="archive-marker" size={28} color="red" />
        {/* <Icon name="delete-circle-outline" size={28} color="red" /> */}

      </Animated.View>
    )
  }
  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        customMapStyle={mapViewConfig}
        userInterfaceStyle={theme == 'dark' ? 'dark' : 'light'}
        initialRegion={location}
        onRegionChangeComplete={(region) => setLocation(region)}
      >
        {markers.map((marker, index) => (
          <Marker coordinate={marker} key={`marker-${index}`} onPress={() => showListingDetails(marker)}>
            <CustomMarker />
          </Marker>
        ))}
      </MapView>
      <Modal visible={showDetails} onDismiss={() => setShowDetails(false)}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <View style={[styles.row, styles.itemCenter, styles.my8]}>
          <Icon name="tag-outline" color={colors.PRIMARY} size={20} style={{ marginRight: 8 }} />
          <View>
            <Text style={mapStyles.lable}>Price</Text>
            <Text style={mapStyles.value}>{Number(2500).toLocaleString()}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.itemCenter, styles.my8]}>
          <Icon name="details" color={colors.PRIMARY} size={20} style={{ marginRight: 8 }} />
          <View>
            <Text style={mapStyles.lable}>Weight</Text>
            <Text style={mapStyles.value}>22.5kg</Text>
          </View>
        </View>
        <View style={[styles.row, styles.itemCenter, styles.justifyEnd]}>
          <Button onPress={() => setShowDetails(false)}>Details</Button>
          <Button onPress={() => setShowDetails(false)}>Close</Button>
        </View>
      </Modal>
    </View>
  )
}
