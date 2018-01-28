import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Right,Left,Button,Icon,H1 } from 'native-base';
import {
  AsyncStorage,AppRegistry,Image,View
} from 'react-native';
export default class OrderList extends Component {
  constructor(){
    super()
    this.state ={
        data:[]

    }
  }
  componentWillMount() {
  orders = ()=>{
alert("Hi");
this.props.navigation.navigate("Profile");
  }
  }
   getUser = async()=>{
    let myArray = await AsyncStorage.getItem('myArray');
    let d =JSON.parse(myArray);
    let userid = d.userId;
    alert(userid);
    return fetch('http://material.kashousing.in/users/get_user_order/'+userid)
    .then((response) => response.json())
    .then((responseJson) => {
     this.setState({data: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    this.getUser();
    
    
  }
  render() {
  
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
                       <View>
                    <Text>Qty : {articleData.qty}</Text>
                  
                    
                    </View>
                    </View>
          </Button>
                       
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                    <Image source={require('./../asset/img/flyash.png')} style={{height: 150, width: null, flex: 1}}/>
                    </View>
                  </CardItem>
               
                  <CardItem>
                    <Left>
                      <Button transparent>
                        <Icon active name="trash" />
                        <Text>Cancel</Text>
                      </Button>
                    </Left>
                  
                    <Right>
                    <Button transparent onPress={this.orders}>
                       
                       <Text>Order status</Text>
                     </Button>
                    </Right>
                  </CardItem>
               </Card>

                  
                )
              });
            
    return (
      <Container>
        <Header />
        <Content>
        {articles}
       
        </Content>
      </Container>
    );
  }
}