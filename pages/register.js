import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,TextInput,TouchableOpacity,Image,Keyboard,StatusBar
} from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input,Text,Thumbnail,
    Grid,Col,Label
  } from 'native-base';

export default class register extends Component {
	   static navigationOptions= ({navigation}) =>({
		  title: 'Register',	
		  headerRight:	
		  <TouchableOpacity
			onPress={() => navigation.navigate('Home')}
			style={{margin:10,backgroundColor:'orange',padding:10}}>
			<Text style={{color:'#ffffff'}}>Login</Text>
		  </TouchableOpacity>
		
	});  	
		  
	constructor(props){
		super(props)
		this.state={
			userName:'',
      userNumber:'',
      referalCode:'',
      userAddress:'', 
      userPassword:'',
      buttonName:'Save',
      ButtonStateHolder :'',				
		}
	}
	
	userRegister = () =>{
    //alert('ok'); // version 0.48
    Keyboard.dismiss();
    this.setState({
      buttonName:'Process..',
      ButtonStateHolder : 'disabled',
    });
		const {userName} = this.state;
		const {userNumber} = this.state;
    const {userPassword} = this.state;
    const {referalCode} = this.state;
    const {userAddress} = this.state;
		
		
		fetch('http://material.kashousing.in/Users', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				name: userName,
        phone: userNumber,
        address: userAddress,
        referal: referalCode,
				password: userPassword,
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
        alert(responseJson);
        this.props.navigation.navigate("Profile",{phoneno:userNumber});
			})
			.catch((error)=>{
				console.error(error);
			});
		
	}
	
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style = {{backgroundColor:'#ffffff'}}>
      <Header style = {{backgroundColor:'#434b52'}}>
      <StatusBar
		 backgroundColor="#606a72"
		 barStyle="light-content"
	   />
          <Left>
            <Button
              transparent iconLeft 
              onPress={()=> navigate("Home")}>
              <Icon name="arrow-back" style = {{color:'#ffffff'}}/>
             
            </Button>
          </Left>
          <Body>
            <Title>Register Now</Title>
          </Body>
          
        </Header>
      
		
      
        <Content>
      
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText= {userName => this.setState({userName})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Mobile No</Label>
              <Input onChangeText= {userNumber => this.setState({userNumber})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText= {userPassword => this.setState({userPassword})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Reference Code</Label>
              <Input onChangeText= {referalCode => this.setState({referalCode})}/>
            </Item>
            <Item floatingLabel>
              <Label>Address</Label>
              <Input
                multiline={true}
                numberOfLines={4} onChangeText= {userAddress => this.setState({userAddress})}
              />
            </Item>
            <Button iconLeft block onPress={this.userRegister} style = {{backgroundColor:'#434b52'}}>
            <Icon name='home' />
            <Text>{this.state.buttonName}</Text>
          </Button>
          </Form>
        </Content>
     
      </Container>
   );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});


AppRegistry.registerComponent('register', () => register);
