import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text,Button,Icon,Title,Separator  } from 'native-base';
import { AppRegistry,View,StatusBar,Image,TextInput,StyleSheet,Keyboard} from 'react-native';
export default class Delivery extends Component {
    constructor(props){
        super(props)
        this.state ={
            data:[],
            data1:[],
            localId:1
    
        }
      }
    
    orderopen_payment(){
      const {state} = this.props.navigation;
      let deliver_id = state.params.deliver;
         return fetch('http://material.kashousing.in/users/get_order_payment/'+deliver_id)
         .then((response) => response.json())
         .then((responseJson) => {
          this.setState({data: responseJson});
          
         })
         .catch((error) => {
           console.error(error);
         });
   
       }
       orderopen_totalpayment(){
        const {state} = this.props.navigation;
        let deliver_id = state.params.deliver;
           return fetch('http://material.kashousing.in/users/get_order_totalpayment/'+deliver_id)
           .then((response) => response.json())
           .then((responseJson) => {
            this.setState({data1: responseJson});
            
           })
           .catch((error) => {
             console.error(error);
           });
     
         }
       componentDidMount() {
         this.orderopen_payment();
         this.orderopen_totalpayment();
         
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
                <Text success>{paymentData.date}</Text>
                </View>
              </Body>
              <Right>
                <Text style={{width:80}}>{paymentData.pay}</Text>
              </Right>
            </ListItem>
             
           </List>


            )
           
          });

    let totalPayment = this.state.data1.map(function (TotalPaymentData, local) {
    
       
            return (
               
            
              <View key={TotalPaymentData.paid}>
              <Separator bordered>
                 <Text>    Total Amount                                    Balance                                     Total Paid</Text>
                
               </Separator>
               <ListItem >
                 <Text>   {TotalPaymentData.total}</Text>
                 <Text>                      {TotalPaymentData.balance}</Text>
                 <Text>                    {TotalPaymentData.paid}</Text>
               </ListItem>
               </View>
            
             
          


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
            <Title>Payment Details</Title>
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
                <Text style={{width:80}}>Amount</Text>
              </Right>
            </ListItem>
          </List>
         {payment}
         {totalPayment}
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
AppRegistry.registerComponent('Payment', () => Payment);