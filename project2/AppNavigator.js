import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen'
import SearchResult from './SearchResult'
import MovieDetails from './MovieDetails'

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: () => ({
				title: 'Welcome',
				headBackTitle: null,
			})
		}
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			headerMode: float,
			headerStyle: {
				backgroundColor: '#D0D3D4',
			},
			headerTintColor: '#2471A3',
			headerTintStyle: {
				fontWeight: 'bold',
			}
		}
	},
)

const SearchStack = createStackNavigator(
	{
		Search: {
			screen: SearchScreen,
			navigationOptions: () => ({
				title: 'Search',
				headBackTitle: null,
			})
		},
		Result: {
			screen: ResultScreen,
			navigationOptions: () => ({
				title: 'Result',
				headBackTitle: null,
			})
		},
		Detail: {
			screen: DetailScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Detail',
				headBackTitle: null,
			})
		}
	},
	{
		initialRouteName: 'Search',
		defaultNavigationOptions: {
			headerMode: float,
			headerStyle: {
				backgroundColor: '#D0D3D4',
			},
			headerTintColor: '#2471A3',
			headerTintStyle: {
				fontWeight: 'bold'
			}
		}
	},
)

const AppNavigator = createAppContainer(
	createStackNavigator(
		{
			Home: HomeStack,
			Search: SearchStack
		},
		{
			defaultNavigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
			}),
			tabBarOptions: {
				activeTintColor: '#2E86C1',
				inactiveTintColor: '#A6ACAF',
			}
		}
	)
)

const getTabBarIcon = (navigation, focused, tintColor) => {
	const { routeName } = navigation.state;
	let iconName;
	if(routeName == 'Home') {
		iconName = `ios-home`
	} else if (routeName == 'Search') {
		iconName = `ios-search`
	} else if (routeName == 'Result') {
		iconName = `ios-albums`
	} else if (routeName == 'Detail') {
		iconName = `ios-film`
	}

	return <Ionicons name={iconName} size={25} color={tintColor} /> 
}

export default AppNavigator