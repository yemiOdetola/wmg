import React, { Fragment, useState } from 'react';
import { View, SafeAreaView, Platform, Image, ScrollView, LayoutAnimation } from 'react-native';
import { Text, List, Divider } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { colors, styles } from '../../utils';
import { usePreferences } from '../../hooks';
import { createListingTest } from '../../redux/actions/listing';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import reqstyles from './reqstyles';

const mylistings = [
  {
    id: 1,
    title: 'Caged Plastic Tank 1000 Litres',
    status: 'pending', // accepted, rejected, new, backlog
    progression: []
  }
]

const listing = {
  user: "6099c0a4a186ee3c5c7a4a91",
  category: "Plastic",
  price: 3000,
  status: "accepted",
  recycler: "6099c0a4a186ee3c5c7a4a92",
  currentOffer: 2800,
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

export default function MyRequests(props: any) {
  const { theme } = usePreferences();
  const dispatch: any = useDispatch();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const { loading } = useSelector(
    (state: any) => ({
      loading: state.ui.loading
    }),
    shallowEqual
  );


  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
        <List.Section title={`${new Date(listing.created).toLocaleString()}`}>
          <View style={styles.mb10}>
            <List.Accordion
              title={<Text>{listing.title}</Text>}
              left={props => listing.status === 'accepted'
                ? <Icon {...props} name="progress-check" size={20} color="#12B76A" />
                : <Icon {...props} name="progress-alert" size={20} color="#F79009" />
              }
              onPress={() => LayoutAnimation.easeInEaseOut()}
            >
              {listing.negotiations.map((el, index) => (
                <Fragment key={index}>
                  <View key={index} style={styles.py14}>
                    <View style={[styles.row, styles.itemCenter, styles.mb8]}>
                      <Text style={reqstyles.lable}>Offer: </Text>
                      <Text style={reqstyles.value}>{el.offer ? `₦${el.offer?.toLocaleString()}` : 'ACCEPTED'}</Text>
                    </View>
                    <View style={[styles.row, styles.mb8]}>
                      <Text style={reqstyles.lable}>Message: </Text>
                      <Text style={reqstyles.value}>{el.message || 'n/A'}</Text>
                    </View>
                    <Text style={reqstyles.timeStamp}>{new Date(el.timestamp).toLocaleString()}</Text>
                  </View>
                  <Divider />
                </Fragment>
              ))}
            </List.Accordion>
          </View>
        </List.Section>

      </SafeAreaView>
    </ScrollView>
  );
}

