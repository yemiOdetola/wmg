import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import About from '../screens/About';
import usePreferences from '../hooks/usePreferences';
import { ForgotPassword, Login, Register, Terms, About } from '../screens/auth';
import DrawerNavigation from './DrawerNavigation';

const RootStack = createNativeStackNavigator();

export default function GuestNavigation(props: any) {

	const navigation = useNavigation();

	const { theme } = usePreferences();


	const buttonBack = () => {
		return (
			<IconButton icon="chevron-left" size={32} onPress={() => navigation.goBack()} />
		)
	};

	const navigatorOptions: any = {
		headerStyle: {
			shadowColor: 'transparent',
			elevation: 0,
			shadowOpacity: 0,
			backgroundColor: theme === 'light' ? '#fff' : '#000',
		},
		// presentation: 'modal',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 18,
		},
		headerTintColor: theme === "dark" ? 'white' : 'black',
		headerBackTitleVisible: false,
		headerTitleAlign: 'center',
		gestureEnabled: true,
	}

	return (
		<RootStack.Navigator screenOptions={route => { return navigatorOptions }}>
			<RootStack.Screen name="login" component={Login} options={{ title: "Login", headerTransparent: true }} />
			<RootStack.Screen name="register" component={Register}
				options={{
					title: "Register",
					headerTransparent: true,
					headerLeft: () => buttonBack()
				}}
			/>
			<RootStack.Screen name="forgotPassword" component={ForgotPassword}
				options={{
					title: "Forgot Password?",
					headerTransparent: true,
					headerLeft: () => buttonBack()
				}}
			/>
			<RootStack.Screen name="about" component={About} options={{ title: "About Us" }} />
			<RootStack.Screen name="terms" component={Terms} options={{ title: 'Terms and Conditions' }} />
			{/* <RootStack.Screen name='Main' component={DrawerNavigation} /> */}
		</RootStack.Navigator>
	)
}