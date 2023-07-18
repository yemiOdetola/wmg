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

const categories = ['generic', 'paper', 'glass', 'textile', 'furniture', 'e-waste', 'batteries', 'plastic', 'metal'];
const includeExtra = true;
const imgUrl = "https://firebasestorage.googleapis.com/v0/b/wmg-pnot.appspot.com/o/listings%2Frn_image_picker_lib_temp_16f458d0-a4d8-41e6-a72a-922f4e002033.jpg?alt=media&token=21c7a41d-cb9c-439b-b4cf-795396c580c8";
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
  const { navigation }: any = props;
  const { theme } = usePreferences();
  const dispatch: any = useDispatch();
  const [title, setTitle] = useState('Old detective books');
  const [instruction, setInstruction] = useState('not negotiable');
  const [description, setDescription] = useState('45 novels');
  const [weight, setWeight] = useState('12');
  const [price, setPrice] = useState('16000');
  const [category, setCategory] = useState('paper');
  const [imageResource, setImageResource] = useState<any>('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoriesModalState, setCategoriesModalVisible] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const [location, setLocation] = useState<any>({ "latitude": 6.526911594850771, "latitudeDelta": 0.08336536212395451, "longitude": 3.3194048143923283, "longitudeDelta": 0.043651945888996124 });

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
      daat.then((coords: any) => {
        console.log('coords', coords);
        setLocation(coords);
      })
    }, 3000)
  }, []);

  const showModal = () => setCategoriesModalVisible(true);
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
    createListingRequest(imgUrl);
    // if (imageResource?.assets) {
    //   dispatch(Loading(true));
    //   const { uri } = imageResource?.assets[0];
    //   let task: any;
    //   if (uri) {
    //     const filename = uri.substring(uri.lastIndexOf('/') + 1);
    //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //     task = storage().ref(`/listings/${filename}`).putFile(uploadUri);
    //   }
    //   try {
    //     await task;
    //     task.then(async () => {
    //       const url = await storage().ref(`/listings/${uri.substring(uri.lastIndexOf('/') + 1)}`).getDownloadURL();
    //       setImageUrl(url);
    //       createListingRequest(url);
    //     })
    //   } catch (e) {
    //     dispatch(Loading(false));
    //     console.error(e);
    //   }
    // } else {
    //   dispatch(Loading(false));
    //   Alert.alert('Please upload an image');
    // }
  };

  const createListingRequest = (url: string) => {
    // if (!url) {
    //   return Alert.alert('Please upload an image');
    // }
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
      category: category,
      user: user.id,
      location: {
        coordinates: [location?.longitude, location?.latitude]
      },
    }
    dispatch(createListing(payload)).then((res: any) => {
      // setImageResource('');
      // setTitle('');
      // setDescription('')
      // setInstruction('')
      // setWeight('')
      // setPrice('')
      // setCategory('')
      Toast.show({ text1: 'Pickup request has been created', position: 'bottom' });
      navigation.navigate('home')
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
        <Button disabled={loading} mode="contained" onPress={() => uploadImage()} dark={theme === "dark" ? false : true}
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

