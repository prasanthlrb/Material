import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Left,Button,Right,Title,Icon,Form, Item, Input, Label} from 'native-base';
import {
    AsyncStorage,AppRegistry,View,Keyboard
  } from 'react-native';
export default class Setting extends Component {
  constructor(props){
		super(props)
		this.state={
			oldPassword:'',
      userPassword:'',
     			
		}
	}
	
    //alert('ok'); // version 0.48
    resetpass = async()=>{
      let myArray = await AsyncStorage.getItem('myArray');
      let d =JSON.parse(myArray);
      let userid = d.userId;
    Keyboard.dismiss();
  
		const {oldPassword} = this.state;
    const {userPassword} = this.state;
    
	
		
		fetch('http://material.kashousing.in/users/change_pass', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
        id:userid,
				old_password: oldPassword,
        password: userPassword,
       
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
        if(responseJson =='ok'){
          alert("Password Change Successfully");
          this.props.navigation.navigate("Home");
        }else{
          alert(responseJson);
        }
        
			})
			.catch((error)=>{
				console.error(error);
			});
		
	}
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Setting</Title>
          </Body>
         
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Text>Password Reset</Text>
            </CardItem>
           
              <Form>
				<Item>
				<Icon active name='lock' />
				  <Input placeholder="Old Password" secureTextEntry={true} onChangeText= {oldPassword => this.setState({oldPassword})}/>
				</Item>
				<Item last>
				<Icon active name='key' />
				  <Input placeholder="New Password"  secureTextEntry={true} onChangeText= {userPassword => this.setState({userPassword})}/>
				</Item>
       
				<View style = {{paddingBottom: 15}} />
        <Button full onPress={this.resetpass}>
            <Text>Reset Password</Text>
          </Button>
			
			  </Form>
             
            <CardItem footer>
             
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Setting', () => Setting);