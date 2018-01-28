 import React, { Component } from 'react';
 import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
 import { StackNavigator  } from 'react-navigation';

 import HomeScreen from './pages/home';
 import Products from './pages/products2';
  import Menu from  './pages/menu';
 import Register from  './pages/register';
 import Guest from  './pages/guest';
 import Userroute from  './pages/userroute';
 import Welcome from  './pages/splash';
 import GuestOrder from  './pages/guestOrder';

  // const myDrawer = DrawerNavigator({
  // 	Home: { screen: HomeScreen },
  //   Products: { screen: Products },	
  //   Register: { screen: Register },	
  //   Userroute: { screen: Userroute },	
  // },
  // {
  // 	contentComponent: props => <Menu {...props} />
  // });

 export default(nativeShop = StackNavigator({

  // Welcome: { screen: Welcome },
	Home: { screen: HomeScreen },
  Products: { screen: Products },	
   Register: { screen: Register },	
  Guest: { screen: Guest },	
   GuestOrder: { screen: GuestOrder },	
   Userroute: { screen: Userroute }},
   {
     headerMode: 'none'
	
  }
	
  ));
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

