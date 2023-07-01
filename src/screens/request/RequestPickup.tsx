import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Platform, Image, Alert } from 'react-native';
import { Text, Button, Modal, RadioButton, Dialog } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'react-native-image-picker';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../../components/shared';
import { colors, styles } from '../../utils';
import { usePreferences } from '../../hooks';
import { createListing } from '../../redux/actions/listing';
import { Loading } from '../../redux/actions/ui';

const categories = ['generic', 'paper', 'glass', 'textitle', 'furniture', 'e-waste', 'batteries', 'plastic'];
const includeExtra = true;

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}

export default function RequestPickup(props: any) {
  const { theme } = usePreferences();
  const dispatch: any = useDispatch();
  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageResource, setImageResource] = useState<any>('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoriesModalState, setCategoriesModalVisible] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const [location, setLocation] = useState<any>({
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { loading, user } = useSelector(
    (state: any) => ({
      loading: state.ui.loading,
      user: state.auth.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    const daat: any = getLocation();
    setTimeout(() => {
      console.log('attention', daat?._z)
      daat.then((coords: any) => {
        console.log('coords', coords);
        setLocation(coords);
      })
      // console.log(JSON.parse(daat))
    }, 3000)
  }, [])

  const showModal = () => setCategoriesModalVisible(true)
  const hideModal = () => setCategoriesModalVisible(false);
  const chooseImage = React.useCallback((type: any, options: any) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setImageResource);
    } else {
      ImagePicker.launchImageLibrary(options, setImageResource);
    }
  }, []);

  const getLocation = async () => {
    const coords: any = await AsyncStorage.getItem('coords');
    console.log('coords', coords);
    return JSON.parse(coords);
  }

  // const generateRandomNumbers: any = () => Math.floor(Math.random() * 1000083920);

  const uploadImage = async () => {
    if (imageResource?.assets) {
      dispatch(Loading(true));
      const { uri } = imageResource?.assets[0];
      let task: any;
      if (uri) {
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        task = storage().ref(`/listings/${filename}`).putFile(uploadUri);
      }
      try {
        await task;
        task.then(async () => {
          const url = await storage().ref(`/listings/${uri.substring(uri.lastIndexOf('/') + 1)}`).getDownloadURL();
          console.log('URL now', url);
          setImageUrl(url);
          setTimeout(() => {
            createListingRequest(url);
          }, 100)
        })
      } catch (e) {
        dispatch(Loading(false));
        console.error(e);
      }
    } else {
      dispatch(Loading(false));
      Alert.alert('Please upload an image');
    }
  };

  const createListingRequest = (url: string) => {
    if (!url) {
      return Alert.alert('Please upload an image');
    }
    if (!title || !description || !instruction || !weight || !price || !category || !title || !title || !title) {
      return Alert.alert('All fields are compulsory');
    }
    const payload = {
      title: title,
      description: description,
      instruction: instruction,
      image: url,
      weight: weight,
      price: price,
      user: user.id,
      location: {
        coordinates: [location?.longitude, location?.latitude]
      },
      category: category,
    }
    // console.log(payload);
    dispatch(createListing(payload)).then((res: any) => {
      setImageResource('');
      console.log('VIEW RES: ', res);
      Toast.show({ text1: 'Pickup request has been created', position: 'bottom' });
    })
  }


  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
        <Text style={[styles.formSubTitle, { alignSelf: 'center', fontSize: 18, fontWeight: '300', textAlign: 'center' }]}>Enter pickup details to continue</Text>
        <Input
          label="Title"
          value={title}
          onChangeText={(text: any) => setTitle(text)}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={(text: any) => setDescription(text)}
          multiline
          numberOfLines={3}
        />
        <Input
          label="Instruction"
          value={instruction}
          onChangeText={(text: any) => setInstruction(text)}
          multiline
          numberOfLines={2}
        />
        <Input
          label="Weight(in kg)"
          value={weight}
          keyboardType="number-pad"
          onChangeText={(text: any) => setWeight(text)}
        />
        <TouchableOpacity
          onPress={showModal}
          style={[styles.dropdownPlaceholder, {
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f1f1',
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
          }]}
        >
          <Text style={styles.ddLabel}>{category ? `Category: ${category}` : "Select Category"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => chooseImage(actions[0].type, actions[0].options)}
          style={[styles.dropdownPlaceholder, {
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f1f1',
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
          }]}
        >
          <Text style={styles.ddLabel}>{"Choose image"}</Text>
        </TouchableOpacity>
        {imageResource?.assets &&
          imageResource?.assets.map(({ uri }: { uri: string }) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{ uri: uri }}
              />
            </View>
          ))}
        <Input
          label="Price(NGN)"
          value={price}
          keyboardType="number-pad"
          onChangeText={(text: any) => setPrice(text.trim())}
        />
        {/* <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => uploadImage()}
          style={styles.AuthButton} labelStyle={styles.authButtonLabel} contentStyle={styles.AuthButtonContent}>
          {!loading ? "Continue" : "Please wait..."}
        </Button> */}
        <Button mode="contained" onPress={() => uploadImage()} dark={theme === "dark" ? false : true}
          style={styles.AuthButton} contentStyle={styles.AuthButtonContent} labelStyle={styles.AuthButtonLabel}>
          {!loading ? "Continue" : "Please Wait..."}
        </Button>
      </SafeAreaView>
      <Modal visible={categoriesModalState} onDismiss={hideModal}
        contentContainerStyle={[styles.modalContainerStyle, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'white' }]}>
        <RadioButton.Group
          onValueChange={value => setCategory(value)}
          value={category}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => setCategory(cat)}>
              <RadioButton
                key={`cat-${index}`}
                value={cat}
                color={colors.PRIMARY}
                status={category === cat ? 'checked' : 'unchecked'}
              />
              <Text style={styles.capitalize}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
        <Button onPress={hideModal}>OK</Button>
      </Modal>
      {/* <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
        <Dialog.Title style={{ fontSize: 18 }}>Do you wish to continue?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">This request will have your address as the pickup location</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogState(false)}>Cancel</Button>
          <Button onPress={uploadImage}>OK</Button>
        </Dialog.Actions>
      </Dialog> */}
    </KeyboardAwareScrollView>
  );
}

