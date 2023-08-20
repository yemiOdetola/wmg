import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Text, Card, Modal, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { InnerLoading, Input } from '../../components/shared';
import { fetchSingleUser } from '../../redux/actions/auth';
import { usePreferences } from '../../hooks';
import { styles } from '../../utils';

export default function ListingDetails(props: any) {
  const { route } = props;
  const { item } = route.params;
  const { theme } = usePreferences();
  const dispatch: any = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookmark, setBookmark] = useState<boolean>(false);
  // const [item, setItem] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);
  const [offerModal, showOfferModal] = useState(false);
  const [offer, setOffer] = useState('')
  const [message, setMessage] = useState('');


  const { loading, sellerInfo } = useSelector(
    (state: any) => ({
      loading: state.ui.loading,
      sellerInfo: state.auth.sellerInfo,
    }),
    shallowEqual
  );

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => renderOptionsButton()
    });
  }, [isBookmark, item]);

  useEffect(() => {
    console.log('item?.el?.user: ', item?.el?.user);
    if (item?.el?.user) {
      dispatch(fetchSingleUser(item?.el?.user));
    }
  }, [])

  useEffect(() => {
    if (item?.el?.user) {
      fetchSingleUser(item?.el?.user);
    }
  }, [item])

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 200)
  }, []);

  const renderOptionsButton = () => {
    if (!isBookmark) {
      return (
        <TouchableOpacity onPress={() => showOfferModal(true)} style={styles.headerOption}>
          <Text>Accept</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.headerOption}>
          <Icon name="cancel" size={20} style={{ marginRight: 2 }} />
          <Text>Remove</Text>
        </TouchableOpacity>
      )
    }
  }

  const removeItem = (id: string) => {
    console.log('ID to be removed', id);
  }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }

  // if (!isLoaded) {
  //   return (
  //     <View style={{ marginTop: 50 }}>
  //       <InnerLoading />
  //     </View>
  //   );
  // }

  return (
    <>
      <SafeAreaView>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <ImageBackground source={{ uri: item?.image || "https://unsplash.com/photos/qph7tJfcDys" }} style={styles.Header2Image} resizeMode={'cover'}>
            <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.Header2Gradient}>
              <Text style={styles.Header2Category}>{item?.el?.category?.toUpperCase() || 'n/A'}</Text>
              <Text style={styles.Header2Title}>{item?.el?.title || 'n/A'}</Text>
              <Text style={styles.Header2SubTitle}>Non-negotiable</Text>
            </LinearGradient>
          </ImageBackground>
          <View style={{ marginTop: 15, marginHorizontal: 15 }}>
            <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
              <Card.Title title="Summary" />
              <Card.Content>
                <Text>Material: {item?.el?.description}</Text>
              </Card.Content>
            </Card>

            <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
              <Card.Title title="Additional Information" />
              <Card.Content>
                <Text>{item?.instruction || 'No additional instruction'}</Text>
              </Card.Content>
            </Card>
            <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
              <Card.Title title="Meet your seller" />
              <Card.Content>
                {/* <Text>Household's INFORMATION</Text> */}
                <Text>{sellerInfo?.name.toUpperCase()}</Text>
                <Text>{sellerInfo?.phone}</Text>
                {/* <Text>{sellerInfo?.email}</Text> */}

              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal visible={offerModal} onDismiss={() => showOfferModal(false)}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <View>
          <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '600' }}>Make an offer</Text>
          <Input
            label="Offer"
            value={offer}
            placeholder={`₦${3400}`}
            keyboardType="number-pad"
            onChangeText={(text: any) => setOffer(text)}
          />
          <Input
            label="Additional Message"
            value={message}
            onChangeText={(text: any) => setMessage(text)}
            multiline
            numberOfLines={3}
          />
        </View>
        <Button mode="contained" onPress={() => showOfferModal(false)}>Submit</Button>
      </Modal>
    </>
  );

}


