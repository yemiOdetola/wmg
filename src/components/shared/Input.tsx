import React from 'react'
import { TextInput } from 'react-native-paper'
import { usePreferences } from '../../hooks';
import { styles } from '../../utils';

export default function Input(props: any) {
  const { theme } = usePreferences();
  return (
    <TextInput
      label={props.label}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      onChangeText={text => props.onChangeText(text)}
      mode="flat"
      editable={props.editable}
      autoCapitalize='none'
      placeholder={props.placeholder || ''}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines || 1}
      keyboardType={props.keyboardType || "default"}
      style={[styles.AuthInput, {
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#f1f1f1',
        // backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
        backgroundColor: 'transparent',
        opacity: props?.editable == false ? 0.2 : 1
      }]}
    />
  )
}
