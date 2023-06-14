import React, { Fragment, useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Checkbox, Chip, Text, Button, TextInput, Modal, RadioButton } from 'react-native-paper';
import { colors, styles } from '../../utils';
import reqstyles from './reqstyles';
import { usePreferences } from '../../hooks';

const categories = ['generic', 'paper', 'glass', 'textitle', 'furniture', 'e-waste', 'batteries', 'plastic'];

export default function Home(props: any) {
  const { theme } = usePreferences();

  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categoriesModalState, setCategoriesModalVisible] = useState(false);

  const onChangeScreen = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const showModal = () => {
    setCategoriesModalVisible(true)
  };
  const hideModal = () => setCategoriesModalVisible(false);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView style={styles.AuthPage}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.AuthContent}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ alignSelf: 'center', fontSize: 16, textAlign: 'center' }}>Request for pickup</Text>
          </View>
          <TextInput
            label="Title"
            value={title}
            onChangeText={text => setTitle(text)}
            mode="flat"
            style={styles.AuthInput}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={text => setDescription(text)}
            mode="flat"
            multiline
            numberOfLines={5}
            style={styles.AuthInput}
          />

          <TextInput
            label="Instruction"
            value={instruction}
            onChangeText={text => setInstruction(text)}
            mode="flat"
            multiline
            numberOfLines={5}
            style={styles.AuthInput}
          />
          <TextInput
            label="Weight(in kg)"
            value={weight}
            onChangeText={text => setWeight(text)}
            mode="flat"
            keyboardType="number-pad"
            style={styles.AuthInput}
          />
          <TouchableOpacity style={styles.dropdownPlaceholder} onPress={showModal}>
            <Text style={styles.ddLabel}>{category ? `Category: ${category}` : "Select Category"}</Text>
          </TouchableOpacity>
          <TextInput
            label="Price(in NGN)"
            value={price}
            onChangeText={text => setPrice(text.trim())}
            mode="flat"
            keyboardType="number-pad"
            style={styles.AuthInput}
          />
          <Button mode="contained" dark={theme === "dark" ? false : true}
            style={styles.AuthButton} labelStyle={styles.authButtonLabel} contentStyle={styles.AuthButtonContent}>
            {/* {!loading ? "Continue" : "Please wait..."} */}
            Continue
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal visible={categoriesModalState} onDismiss={hideModal} contentContainerStyle={styles.modalContainerStyle}>
        <RadioButton.Group
          onValueChange={value => setCategory(value)}
          value={category}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={[styles.modalItem, styles.row, styles.itemCenter]} onPress={() => setCategory(cat)}>
              <RadioButton
                key={`cat-${index}`}
                value={cat}
                color="#000"
                status={category === cat ? 'checked' : 'unchecked'}
              />
              <Text style={styles.capitalize}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>
        <Button onPress={hideModal}>OK</Button>
      </Modal>
    </SafeAreaView>

  );

}

