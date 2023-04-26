import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Heart, ShoppingCart, Account, Calendar, Dumbbell, Watermelon, Rss, Gear, ChevronRight } from '../components/shared/Icons';
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
			<TouchableOpacity onPress={() => onChangeScreen("home")} activeOpacity={0.8}>
				<View style={styles.DrawerHeader}>
					<Image source={theme === "dark" ? require('../assets/logo-white.png') : require('../assets/logo.png')} resizeMode={"contain"} style={styles.DrawerImage} />
				</View>
			</TouchableOpacity>

			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={() => onChangeScreen("workouts")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Workouts"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="calendar-month-outline" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("exercises")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Exercises"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="dumbbell" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("diets")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Diets"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="fruit-watermelon" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("store")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Store"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="cart-outline" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("blog")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Blog"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="rss" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("profile")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Profilw"
						left={props => <Icon {...props} style={styles.DrawerIconMenu} name="account-outline" />}
						right={props => <Icon {...props} style={styles.DrawerIconRightMenu} name="chevron-right" />}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onChangeScreen("favorites")} activeOpacity={0.8}>
					<List.Item
						titleStyle={styles.DrawerTitleMenu}
						style={styles.DrawerMenuItem}
						title="Favorites"
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