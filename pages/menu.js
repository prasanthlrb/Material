import React, { Component } from 'react';
import { AppRegistry,View,StyleSheet
,TouchableOpacity,StatusBar,Image } from 'react-native';
import { Container,Content, List, ListItem, Text,Icon, Left, Body, Right, Switch,Button } from 'native-base';
export default class menu extends Component{

	render(){
		const { navigate } = this.props.navigation;
		return(
			<Container style={{backgroundColor:'#ffffff'}}>
      
	  <Content>
	  <List>
	  <ListItem>
	  <Image source={require('../asset/img/app-icon.png')} style={{height: 150, width: null, flex: 1}}/>
	  </ListItem>
		
	  <ListItem icon>
			<Left>
			  <Icon name="person" />
			</Left>
			<Body>
			  <Text>prasanth</Text>
			</Body>
		   
		  </ListItem>
		  <ListItem icon onPress={()=> navigate("Profile")}>
			<Left>
			  <Icon name="grid" />
			</Left>
			<Body>
			  <Text>Material List</Text>
			</Body>
		   
		  </ListItem>
			<ListItem icon onPress={()=> navigate("Order")}>
			<Left>
			  <Icon name="cart" />
			</Left>
			<Body>
			  <Text>Our Orders</Text>
			</Body>
		   
		  </ListItem>
		  <ListItem icon onPress={()=> navigate("Referral")}>
			<Left>
			  <Icon name="share" />
			</Left>
			<Body>
			  <Text>Referral Code</Text>
			</Body>
			
		  </ListItem>
		  <ListItem icon onPress={()=> navigate("Offers")}>
			<Left>
			  <Icon name="star" />
			</Left>
			<Body>
			  <Text>Offers</Text>
			</Body>
			
		  </ListItem>
		  {/* <ListItem icon>
			<Left>
			  <Icon name="mail" />
			</Left>
			<Body>
			  <Text>Message</Text>
			</Body>
			
		  </ListItem> */}
		  <ListItem icon onPress={()=> navigate("Setting")}>
			<Left>
			  <Icon name="settings" />
			</Left>
			<Body>
			  <Text>Setting</Text>
			</Body>
		   
		  </ListItem>
		  <ListItem icon onPress={()=> navigate("Home")}>
			<Left>
			  <Icon name="lock" />
			</Left>
			<Body>
			  <Text>Sign Out</Text>
			</Body>
		   
		  </ListItem>
		</List>
	  </Content>
	</Container>
		);
	}
}
const styles = StyleSheet.create({
	pageName:{
		margin:10,fontWeight:'bold',
		color:'#000', textAlign:'center'
	},
});


AppRegistry.registerComponent('menu', () => menu);
