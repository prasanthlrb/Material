import React, { Component } from 'react';
import { AppRegistry,View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { StackNavigator,DrawerNavigator  } from 'react-navigation';

import HomeScreen from './home';
// import Products from './pages/products2';
import Menu from  './menu';
// import Register from  './pages/register';
import Profile from  './profile';
import Order from  './order';
import Referral from  './referral';
import Offers from  './offers';
import Setting from  './setting';
import Orderfinal from  './orderfinal';
import OrderList from './orderlist';
import Delivery from  './delivery';
import Payment from  './payment';
import Remove from  './remove';

const myDrawer = DrawerNavigator({	
  Order: { screen: Order },	
  Profile: { screen: Profile },	
  Delivery: { screen: Delivery },
  Payment: { screen: Payment },
  Referral: { screen: Referral },	
  Offers: { screen: Offers },	
  Setting: { screen: Setting },
  Remove: { screen: Remove },
  Orderfinal: { screen: Orderfinal },	
  
},
{
	contentComponent: props => <Menu {...props} />
});

const nativeShop = StackNavigator({
  Homeroute: { screen: myDrawer }},
  {
    headerMode: 'none'
	
 });
export default nativeShop;