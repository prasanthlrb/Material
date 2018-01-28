import React, { Component } from 'react';
import { AppRegistry,View,StatusBar,Image,TextInput,StyleSheet,Keyboard,BackHandler,BackAndroid } from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input,Text,Thumbnail,
    Grid,Col,Fab,Footer, FooterTab,Spinner
  } from 'native-base';
	import PopupDialog from 'react-native-popup-dialog';
	import Slideshow from 'react-native-slideshow';
	import Communications from 'react-native-communications';
	import SplashScreen from 'react-native-splash-screen';
export default class home extends Component{

	static navigationOptions= ({navigation}) =>({
	header:null,
		headerStyle :{ backgroundColor: '#434b52' }
		 }); 
	constructor(props){
		super(props)
		this.state={
			userMobile:'',
      userPassword:'',
		forgetPassword:'',
		active:false,
		dataSource:[],
		position: 1,
			interval: null,
			loader:true,
	}
}
login = ()=>{
Keyboard.dismiss();
const {userMobile,userPassword} = this.state;
if(userMobile==""){
//alert("Please enter Email address");
this.setState({phone:'Please enter Mobile number'})

}else if(userPassword==""){
	this.setState({phone:'Please enter password'})
}
else{
	
  fetch('http://material.kashousing.in/Users/user_login',{
	method:'post',
	header:{
	  'Accept': 'application/json',
	  'Content-type': 'application/json'
	},
	body:JSON.stringify({
	  // we will pass our input data to server
	  phone: userMobile,
	  password: userPassword
	})
	
  })
  .then((response) => response.json())
   .then((responseJson)=>{
	 if(responseJson == "ok"){
	   // redirect to profile page
	   alert("Successfully Login");
	   this.props.navigation.navigate("Profile",{phoneno:userMobile});
	 }else{
	   alert("Wrong Login Details");
	 }
   })
   .catch((error)=>{
   console.error(error);
   });
  }
  
  
 
 
}
 
forget = ()=>{
const {forgetPassword} = this.state;
this.popupDialog.dismiss();
fetch('http://material.kashousing.in/Settings/change_pass', {
		method: 'post',
		header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body:JSON.stringify({
			phone: forgetPassword,
		})
		
	})
	.then((response) => response.json())
		.then((responseJson) =>{
			alert(responseJson);
		})
		.catch((error)=>{
			console.error(error);
		});

}
getData(){
	return fetch('http://material.kashousing.in/Client/view_slider')
 .then((response) => response.json())
 .then((responseJson) => {
	this.setState({dataSource: responseJson});
 })
 .catch((error) => {
	 console.error(error);
 });
 
 }
 componentDidMount() {
	SplashScreen.hide();
	this.getData();
	

 }
 componentWillMount() {
	this.setState({
		interval: setInterval(() => {
			this.setState({
				position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
			});
		}, 2000)
	});

}

componentWillUnmount() {
	clearInterval(this.state.interval);
}
  
	render(){
		const { navigate } = this.props.navigation;
	
		return(
			<Container style = {{backgroundColor:'#ffffff'}}>
  
              
			<Header style = {{backgroundColor:'#434b52'}}>
			<StatusBar
		 backgroundColor="#606a72"
		 barStyle="light-content"
	   />
			  
			  <Body style = {{alignItems: 'center'}}>
			
				<Title>K.A.S MATERIAL SUPPLY</Title>
				
			  </Body>
			  
			</Header>
		
		  

		 
	  
			 
			
			 <Slideshow dataSource={this.state.dataSource}
			 position={this.state.position}
			 onPositionChanged={position => this.setState({ position })}
			 />
       
    
		   <Text style={{padding:5,margin:5,color:'red'}}>{this.state.phone}</Text>
			  <Form>
				<Item>
				<Icon active name='ios-phone-portrait' />
				  <Input placeholder="Mobile Number" onChangeText={userMobile => this.setState({userMobile})}/>
				</Item>
				<Item last>
				<Icon active name='key' />
				  <Input placeholder="Password" onChangeText={userPassword => this.setState({userPassword})} secureTextEntry={true}/>
				</Item>
				<View style = {{paddingBottom: 15}} />
				<Button iconLeft block style = {{backgroundColor:'#434b52'}} onPress={this.login}>
				<Icon name='unlock' />
				<Text>Login</Text>
			  </Button>
			  </Form>
			
				<View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end'}}>
		<Button iconLeft dark onPress={() => {this.popupDialog.show();}} transparent >
		<Icon name='paper-plane' />
            <Text>Forget Password</Text>
          </Button>
	 </View>
			  
	<View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',marginTop:0}}>
	<Button rounded light iconLeft onPress={() => Communications.phonecall('+9178710 00988', true)}>
	<Icon name='call' />
            <Text>feel free to call us</Text>
          </Button>
		</View>
		  
			
		  <PopupDialog
		  ref={(popupDialog) => { this.popupDialog = popupDialog; }} containerStyle={{zIndex: 10, elevation: 5 }} height={180}>
		  
			  
		  <TextInput style = {styles.input}
					 underlineColorAndroid = "transparent"
					 placeholder = "Mobile Number"
					 placeholderTextColor = "#434b52"
					 autoCapitalize = "none"
					 onChangeText = {this.handlePassword} onChangeText={forgetPassword => this.setState({forgetPassword})}/>
					 <View style = {{position: 'relative',left:200}}>
					 <Button iconLeft bordered success onPress={this.forget}>
				  <Icon name='paper-plane' />
				  <Text>Submit</Text>
				</Button></View>
				<View style = {{position: 'relative',left:50,bottom:43}}>
					 <Button iconLeft bordered danger onPress={() => {
			this.popupDialog.dismiss();
		  }}>
				  <Icon name='close' />
				  <Text>Cancel</Text>
				</Button></View>
			
		</PopupDialog>
	
				<Footer>
          <FooterTab style = {{backgroundColor:'#434b52'}}>
            <Button vertical onPress={()=> navigate('Register')}>
              <Icon name="clipboard" style = {{color:'#ffffff'}}/>
              <Text style = {{color:'#ffffff'}}>Register</Text>
            </Button>
            <Button vertical onPress={()=> navigate('Guest')}>
              <Icon name="cart" style = {{color:'#ffffff'}}/>
              <Text style = {{color:'#ffffff'}}>Guest User</Text>
            </Button>
          
          </FooterTab>
        </Footer>
		  
		
			
		
       
		  
		  </Container>
		);
	}
}

const styles = StyleSheet.create({
	input: {
	  margin: 15,
	  marginTop:40,
	  height: 40,
	  borderColor: '#434b52',
	  borderWidth: 1
   },
  })

AppRegistry.registerComponent('home', () => home);
