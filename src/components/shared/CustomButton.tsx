import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../utils';

export default function CustomButton(props: any) {

	const { Icon, Label, Click } = props;

	return (
		<TouchableNativeFeedback onPress={Click}>
			<View style={styles.Button1}>
				<Icons name={Icon} style={styles.Button1IconLeft} />
				<Text style={styles.Button1Text}>{Label}</Text>
				<Icons name="chevron-right" style={styles.Button1IconRight} />
			</View>
		</TouchableNativeFeedback>
	);
}