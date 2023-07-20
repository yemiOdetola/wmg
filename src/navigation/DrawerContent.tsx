import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from "react-native-paper";
import { styles } from '../utils';
import { usePreferences } from '../hooks';

export default function DrawerContent(props: any) {
	const { theme } = usePreferences();

	const { navigation } = props;

	const onChangeScreen = (screen: string) => {
		navigation.navigate(screen);
	};

	return (

		<DrawerContentScrollView>
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={() => onChangeScreen("listing")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Listing"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="rss" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("profile")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Profile"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="account-outline" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("favorites")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Pickups"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="heart-outline" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("settings")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Settings"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="cog-outline" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>
			</View>

		</DrawerContentScrollView>

	)
}