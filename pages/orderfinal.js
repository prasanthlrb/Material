import React, { Component } from "react";
import { Platform,TextInput,AppRegistry,StyleSheet,AsyncStorage,Keyboard} from "react-native";
import { Container, Header,Label, Title,Input, Content,H1, Button, Icon, Text, Right, Body,Grid,Col, Left, Picker, Form, Item as FormItem } from "native-base";
const Item = Picker.Item;
export default class LoginOrder extends Component {
    static navigationOptions= ({navigation}) =>({
        header:null,
             
         });
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      selected3: undefined,
      data:[],
      user_id:'',
      qty:''
    };
  }
 
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
    
  }
  onValueChange3(value: string) {
    this.setState({
      selected3: value
    });
  
  }
  getData(){
    const {state} = this.props.navigation;
    let id = state.params.user;
    return fetch('http://material.kashousing.in/users/get_sub_material/'+id)
    .then((response) => response.json())
    .then((responseJson) => {
     this.setState({data: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
    
}

getUser = async()=>{
  let myArray = await AsyncStorage.getItem('myArray');
  let d =JSON.parse(myArray);
  let userid = d.userId;
  this.setState({
    user_id:userid
  });

}
componentDidMount() {
    this.getData();
    this.getUser();
  }
  userOrder = () =>{
    //alert('ok'); // version 0.48
    Keyboard.dismiss();
    
		const {user_id} = this.state;
    const {qty} = this.state;
    const {selected3} = this.state;
    const {selected2} = this.state;
		alert(user_id+'-'+qty+'-'+selected3+'-'+selected2);
		
		fetch('http://material.kashousing.in/Users/login_order', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				userid: user_id,
        qty: qty,
        unit: selected3,
        pro_id: selected2,
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
        alert(responseJson);
        this.props.navigation.navigate("Order");
			})
			.catch((error)=>{
				console.error(error);
			});
		
	}
  render() {
    let articles1 = this.state.data.map(function (articleData, index) {
              return (
                <Item key={articleData.id} label={articleData.title} value={articleData.id} />
            )
        });
    const { navigate } = this.props.navigation;
   
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.navigate("Profile")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Our Order Details</Title>
          </Body>
        
        </Header>
        <Content>
            {/* <H1>Order Form</H1> */}
          <Form>
            
              <Picker
              mode="dropdown"
              placeholder="Select One"
              note={false}
              autoFocus = {true}
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="Select Material" value="0" />
              {articles1}
            </Picker>
       
            
            <Grid>
            <Col>
            <TextInput 
  returnKeyType = {"next"}
  placeholder = "QTY"
  onChangeText= {qty => this.setState({qty})
  }/>
            </Col>
            <Col>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              note={false}
              selectedValue={this.state.selected3}
              onValueChange={this.onValueChange3.bind(this)}
            >
              <Item label="Select Unit" value="0" />
              <Item label="Nos" value="Nos" />
              <Item label="Tons" value="Tons" />
              <Item label="Units" value="Units" />
              <Item label="Bags" value="Bags" />
            </Picker>
            </Col>
          
          </Grid>
          <TextInput  returnKeyType = {"next"}
  placeholder = "Coupan Code"
  onSubmitEditing={(event) => { 
    this.refs.SecondInput.focus()}}/>
          <Button block bordered onPress={this.userOrder}>
              <Icon name='cart' />
              <Text>Order Now</Text>
             
            </Button>
          </Form>
         
          
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Orderfinal', () => Orderfinal);