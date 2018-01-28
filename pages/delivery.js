import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text,Button,Title,Icon } from 'native-base';
import { AppRegistry,View,StatusBar,Image,TextInput,StyleSheet,Keyboard} from 'react-native';
export default class Delivery extends Component {
    constructor(props){
        super(props)
        this.state ={
            data:[],
            localId:1
    
        }
      }
    
    orderopen_payment(){
      const {state} = this.props.navigation;
      let deliver_id = state.params.deliver;
         return fetch('http://material.kashousing.in/users/get_order_schedule/'+deliver_id)
         .then((response) => response.json())
         .then((responseJson) => {
          this.setState({data: responseJson});
          
         })
         .catch((error) => {
           console.error(error);
         });
   
       }
       componentDidMount() {
         this.orderopen_payment();
         
         
       }
  render() {

    const { navigate } = this.props.navigation;
    var local = 1;
    let payment = this.state.data.map(function (paymentData, local) {
    
       
            return (
               
              <List key={paymentData.date}>
               <ListItem>
              <Left>
              <Text>{local+1}</Text>
              </Left>
              <Body>
              <View style = {{position: 'relative',right:50}}>
              {
                paymentData.status == 0 ?
                <Text style={{color:'red'}}>{paymentData.date}</Text>
                :
                <Text style={{color:'green'}}>{paymentData.date}</Text>
              }
               
                </View>
              </Body>
              <Right>
                <Text style={{width:80}}>{paymentData.qty}</Text>
              </Right>
            </ListItem>
             
           </List>


            )
           
          });

    return (
      <Container style = {{backgroundColor:'#ffffff'}}>
      <Header>
          <Left>
            <Button transparent onPress={()=> this.props.navigation.navigate("Order")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Delivery Details</Title>
          </Body>
       
        </Header>
        <Content>
          <List>
            <ListItem>
              <Left>
              <Text >S No</Text>
              </Left>
              <Body>
                <View style = {{position: 'relative',right:50}}>
                <Text >Date</Text>
                </View>
              </Body>
              <Right>
                <Text style={{width:80}}>qty</Text>
              </Right>
            </ListItem>
          </List>
         {payment}
         <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',marginTop:10}}>
         <Button rounded light onPress={()=> navigate('Order')}>
            <Text>Back To Orders</Text>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Delivery', () => Delivery);