import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Right,Left,Button,Icon } from 'native-base';
import {
  AsyncStorage,AppRegistry,Image
} from 'react-native';
export default class OrderComplete extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
            <Text>Order Placed 4-Nov-2017</Text>
              <Right style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end'}}>
                <Text>ORDER ID  404-1241370</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('./../asset/img/flyash.png')} style={{height: 150, width: null, flex: 1}}/>
            </CardItem>
         
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="cart" />
                  <Text>Order Details</Text>
                </Button>
              </Left>
             
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}