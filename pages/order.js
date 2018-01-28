import React, { Component } from 'react';
import { Container,Content, Header, Tab, Tabs, TabHeading, Icon, Text,Left,Button,Right,Body,Title, Card, CardItem,H1,Spinner } from 'native-base';
import {
    AsyncStorage,AppRegistry,Image,View,StyleSheet,Alert
  } from 'react-native';

  import PopupDialog from 'react-native-popup-dialog';
  // import OrderList from './orderlist';
  import OrderComplete from './ordercomplete';
  // import OrderOpen from './orderopen';
  import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Order extends Component {
  constructor(){
    super()
    this.state ={
        data:[],
        loader:true,
        data1:[],
        userid:''

    }
  }

     getUser = async()=>{
      let myArray = await AsyncStorage.getItem('myArray');
      let d =JSON.parse(myArray);
      let userid = d.userId;
      this.setState({userid: userid});
      return fetch('http://material.kashousing.in/users/get_user_order/'+userid)
      .then((response) => response.json())
      .then((responseJson) => {
       this.setState({data: responseJson});
       this.setState({loader: false});
      })
      .catch((error) => {
        console.error(error);
      });
    }


    orderopen = async()=>{
      let myArray = await AsyncStorage.getItem('myArray');
      let d =JSON.parse(myArray);
      let userid = d.userId;
      return fetch('http://material.kashousing.in/users/get_order_confirm/'+userid)
      .then((response) => response.json())
      .then((responseJson) => {
       this.setState({data1: responseJson});
       
      })
      .catch((error) => {
        console.error(error);
      });

    }
    // ordercomplete = async()=>{
    //   let myArray = await AsyncStorage.getItem('myArray');
    //   let d =JSON.parse(myArray);
    //   let userid = d.userId;
    //   return fetch('http://17aa245b.ngrok.io/materials/users/get_order_confirm/'+userid)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //    this.setState({data2: responseJson});
       
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // }
    componentDidMount() {
      this.getUser();
      this.orderopen();
      // this.ordercomplete();
      
      
    }
    
    
    
    orderdataOpen(){
      this.popupDialog.show();
      alert("Working");
    }
    // getUser = async()=>{
    //     let myArray = await AsyncStorage.getItem('myArray');
    //     let d =JSON.parse(myArray);
    //     alert(d.userName);
    //   }
    //   componentDidMount() {
    //     this.getUser();
        
        
    //   }
   
    // orders = ()=>{
    //   alert("Hi");
    //     }
    cancel(){
   alert("Cancel");
    }
      
  render() {
    const tableHead = ['S No', 'Date', 'Qty'];
    const tableData = [
      ['1', '25','a'],
      ['2','25', 'b'],
      ['3','25', 'c'],
    
      
    ];
    const { navigate } = this.props.navigation;
    let articles = this.state.data.map(function (articleData, index) {
      let matid = articleData.id;

            return (
              <Card key={articleData.id}>
              <CardItem header>
              <Text>Order Placed {articleData.date}</Text>
                <Right style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end'}}>
                  <Text>ORDER ID  {articleData.o_id}</Text>
                </Right>
              </CardItem>
              <CardItem cardBody>
              <Button rounded light style={{position:'absolute',bottom:50,left:80,opacity:0.8,width:240,height:60,flex: 1, flexDirection: 'row',justifyContent: 'center'}}  onPress={() => {
  this.popupDialog.show();
}}>
       <View>
                   <H1>{articleData.product_name}</H1>
                  
                </View>
      </Button>
                   
                <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                <Image source={{uri:articleData.url}} style={{height: 150, width: null, flex: 1}}/>
                </View>
              </CardItem>
           
              <CardItem>
                <Left>
                  <Button transparent onPress={() => {
   Alert.alert(
    'Remove',
    articleData.product_name,
    [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => navigate('Remove',{removepro:articleData.o_id})},
    ],
    { cancelable: false }
  );
  }}>
                    <Icon active name="trash" />
                    <Text>Cancel</Text>
                  </Button>
                </Left>
              
                <Right>
              
                   
                <Text>Qty : {articleData.qty} - {articleData.unit}</Text>
              
                </Right>
              </CardItem>
           </Card>

              
            )
          });

          let openOrder = this.state.data1.map(function (orderOpen, index) {
           
      
                  return (

                   <View key={orderOpen.id}>
                      {
                      orderOpen.sell !=0 || orderOpen.balance !=0 ?
                    
                     
                
                    <Card>
                    
                    <CardItem header>
                    <Text>Order Placed {orderOpen.date}</Text>
                      <Right style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <Text>ORDER ID  {orderOpen.o_id}</Text>
                      </Right>
                    </CardItem>
                    <CardItem cardBody>
                    <Button rounded light style={{position:'absolute',bottom:50,left:80,opacity:0.8,width:240,height:60,flex: 1, flexDirection: 'row',justifyContent: 'center'}}  onPress={() => {
        this.popupDialog.show();
      }}>
             <View>
                         <H1>{orderOpen.product_name}</H1>
                         <View>
                         <Text>Qty : {orderOpen.qty} - {orderOpen.unit}</Text>
                      </View>
                      </View>
            </Button>
                         
                      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                      <Image source={{uri:orderOpen.url}} style={{height: 150, width: null, flex: 1}}/>
                      </View>
                    </CardItem>
                 
                    <CardItem>
                    <Left>
                      <Button transparent style={{width:200}} onPress={()=> navigate('Payment',{deliver: orderOpen.o_id})}>
                    
                        <Text>Payment Details</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button transparent onPress={()=> navigate('Delivery',{deliver: orderOpen.o_id})} style={{width:200}}>
                  
                        <Text>Delivery Details</Text>
                      </Button>
                    </Body>
                    {/* <Right>
                      <Text>Qty : 3500</Text>
                    </Right> */}
                  </CardItem>
                 </Card>
                 :
                  <View/>  
                }  
      </View>
      
                  )
                });



                let completeOrder = this.state.data1.map(function (orderComplete, index) {
           
      
                  return (

                   <View key={orderComplete.o_id}>
                      {
                      orderComplete.sell ==0 || orderComplete.balance ==0 ?
                    
                     
                
                    <Card>
                    
                    <CardItem header>
                    <Text>Order Placed {orderComplete.date}</Text>
                      <Right style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end'}}>
                        <Text>ORDER ID  {orderComplete.o_id}</Text>
                      </Right>
                    </CardItem>
                    <CardItem cardBody>
                    <Button rounded light style={{position:'absolute',bottom:50,left:80,opacity:0.8,width:240,height:60,flex: 1, flexDirection: 'row',justifyContent: 'center'}} 
      >
             <View>
                         <H1>{orderComplete.product_name}</H1>
                         <View>
                         <Text>Qty : {orderComplete.qty} - {orderComplete.unit}</Text>
                      </View>
                      </View>
            </Button>
                         
                      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                      <Image source={{uri:orderComplete.url}} style={{height: 150, width: null, flex: 1}}/>
                      </View>
                    </CardItem>
                 
                    <CardItem>
                    <Left>
                      <Button transparent style={{width:200}} onPress={()=> navigate('Payment',{deliver: orderComplete.o_id})}>
                    
                        <Text>Payment Details</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button transparent onPress={()=> navigate('Delivery',{deliver: orderComplete.o_id})} style={{width:200}}>
                  
                        <Text>Delivery Details</Text>
                      </Button>
                    </Body>
                    {/* <Right>
                      <Text>Qty : 3500</Text>
                    </Right> */}
                  </CardItem>
                 </Card>
                 :
                  <View/>  
                }  
      </View>
      
                  )
                });
        
        
  
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
            <Title>Order List</Title>
          </Body>
         
        </Header>
      
        
        <Tabs>
      
        <Tab heading={ <TabHeading><Text>Our Orders</Text></TabHeading>}>
        {/* <OrderList /> */}
        <Content>
        {
              this.state.loader ?
              <Spinner color='blue' />
              :
              <View/>
          }
        
        {articles}
        </Content>
          </Tab>
          <Tab heading={ <TabHeading><Text>Open Orders</Text></TabHeading>}>
          <Content>
          {openOrder}
        </Content>
          </Tab>
          <Tab heading={ <TabHeading><Text style={{fontSize:13}}>Complete Orders</Text></TabHeading>}>
          <Content>
         {completeOrder}

         
  
  </Content>
          </Tab>
         
         
        </Tabs>

      
        
      </Container>
      
    );
  }
}
const styles = StyleSheet.create({
  table: { width: 360 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { textAlign: 'center' }
})
AppRegistry.registerComponent('Order', () => Order);