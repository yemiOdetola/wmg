import React, { Fragment, useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { Checkbox, Chip, Text, Button, TextInput, Modal, RadioButton, Dialog } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'react-native-image-picker';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Input } from '../../components/shared';
import { colors, styles } from '../../utils';
import reqstyles from './reqstyles';
import { usePreferences } from '../../hooks';
import { createListingTest } from '../../redux/actions/listing';
import Toast from 'react-native-toast-message';

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

export default function Home(props: any) {
  const { theme } = usePreferences();
  const dispatch: any = useDispatch();

  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageResource, setImageResource] = useState<any>('');
  const [categoriesModalState, setCategoriesModalVisible] = useState(false);
  const [dialogState, setDialogState] = useState(false);

  const { loading } = useSelector(
    (state: any) => ({
      loading: state.ui.loading
    }),
    shallowEqual
  );

  const showModal = () => setCategoriesModalVisible(true)
  const hideModal = () => setCategoriesModalVisible(false);

  const chooseImage = React.useCallback((type: any, options: any) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setImageResource);
    } else {
      ImagePicker.launchImageLibrary(options, setImageResource);
    }
  }, []);

  const createListing = () => {
    const payload = {}
    dispatch(createListingTest(payload)).then((res: any) => {
      Toast.show({
        text1: 'Pickup request has been created'
      });
    })
  }


  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps={"handled"}
      enableResetScrollToCoords={false}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 28 }}>
          <Text style={{ alignSelf: 'center', fontSize: 18, textAlign: 'center' }}>Request for pickup</Text>
        </View>
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
          numberOfLines={3}
        />
        <Input
          label="Weight(in kg)"
          value={weight}
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
          <Text style={styles.ddLabel}>{category ? `Category: ${category}` : "Select Category"}</Text>
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
          onChangeText={(text: any) => setPrice(text.trim())}
        />
        <Button mode="contained" dark={theme === "dark" ? false : true} onPress={() => setDialogState(true)}
          style={styles.AuthButton} labelStyle={styles.authButtonLabel} contentStyle={styles.AuthButtonContent}>
          {!loading ? "Continue" : "Please wait..."}
        </Button>
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
        <Dialog visible={dialogState} onDismiss={() => setDialogState(false)}>
          <Dialog.Title style={{ fontSize: 18 }}>Do you wish to continue?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">This request will have your address as the pickup location</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogState(false)}>Cancel</Button>
            <Button onPress={createListing}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

