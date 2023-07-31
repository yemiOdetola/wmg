import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Platform, Image, ScrollView, LayoutAnimation } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Text, Divider, Checkbox } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { colors, styles, config } from '../../utils';
import { usePreferences } from '../../hooks';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import reqstyles from './reqstyles';

const listing = {
  user: "6099c0a4a186ee3c5c7a4a91",
  category: "Plastic",
  price: 3000,
  status: "accepted",
  recycler: "6099c0a4a186ee3c5c7a4a92",
  currentOffer: 2800,
  weight: 1.6,
  title: 'Crunched aged Plastic Tank 1000 Litres',
  created: Date.now(),
  negotiations: [
    {
      user: "6099c0a4a186e",
      status: 'accepted',
      message: "Thanks. Let's proceed with the transaction.",
      timestamp: "2023-05-15T10:00:00.000Z"
    },
    {
      user: "6099c0a4a186e",
      offer: 2700,
      message: "I don add money for you my guy",
      timestamp: "2023-05-15T11:00:00.000Z"
    },
    {
      user: "6099c0a4a186e",
      offer: 2900,
      message: "I only am willing to sell the plastic waste for ₦‎2800",
      timestamp: "2023-05-15T12:00:00.000Z"
    },
    {
      user: "6099c0a4a186e",
      offer: 2500,
      message: "whats your last price for this?",
      timestamp: "2023-05-15T11:00:00.000Z"
    },
  ]
}

export default function PickupSchedule(props: any) {
  const { theme } = usePreferences();
  const { navigation }: any = props;
  const dispatch: any = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const [weight, setWeight] = useState(123);
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(223500);
  const [pickupIndices, setPickupIndices] = useState([0, 1, 9]);

  const { loading } = useSelector(
    (state: any) => ({
      loading: state.ui.loading
    }),
    shallowEqual
  );

  const addToPickup = (index: number) => {
    const indices = [...pickupIndices];
    if (indices.findIndex((el) => el == index) >= 0) {
      indices.splice(index, 1);
    } else {
      indices.push(index);
    }
    setPickupIndices(indices)
  }


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
      <ScrollView>
        <View style={[styles.row, styles.itemCenter, styles.justifyBetween]}>
          <Text style={[reqstyles.sectionTitle, { color: colors.PRIMARY }]}>Pickup summary</Text>
          <TouchableOpacity onPress={() => navigation.navigate('listing')}>
            <Text>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={reqstyles.detailsContainer}>
          <View style={[styles.row, styles.itemsBaseline, styles.my8]}>
            <Text style={reqstyles.totalLabel}>Total Weight:</Text>
            <Text style={reqstyles.totalValue}>{weight.toFixed(2)} KG</Text>
          </View>
          <View style={[styles.row, styles.itemsBaseline, styles.my8]}>
            <Text style={reqstyles.totalLabel}>Total Price:</Text>
            <Text style={reqstyles.totalValue}>NGN {price.toLocaleString()}</Text>
          </View>
          <View style={[reqstyles.dateStyle, styles.mt8]}>
            <Text style={[reqstyles.totalLabel]}>Select date</Text>
            <DateTimePicker
              style={{ opacity: 1, backgroundColor: 'transparent' }}
              value={date} minimumDate={new Date()}
              placeholderText="select date"
            />
          </View>
        </View>

        <Text style={[reqstyles.sectionTitle, { color: colors.PRIMARY }]}>Select requests...</Text>
        {Array(12).fill('x').map((item: any, index: number) => (
          <TouchableOpacity key={index} style={[reqstyles.item, styles.row, styles.itemCenter]}>
            <View style={reqstyles.itemData}>
              <Text style={reqstyles.title}>{listing.title}</Text>
              <Text style={reqstyles.offer}>₦{listing.currentOffer.toLocaleString()}</Text>
              <Text style={reqstyles.weight}>{listing.weight}kg</Text>
            </View>
            <TouchableOpacity style={reqstyles.itemCheck} onPress={() => addToPickup(index)}>
              {pickupIndices.findIndex((el) => el == index) >= 0
                ? <Icon name="checkbox-marked-circle" style={[reqstyles.checkBox, {}]} />
                : <Icon name="checkbox-blank-circle-outline" style={[reqstyles.checkBox, {}]} />
              }
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

