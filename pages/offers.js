import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Left,Button,Right,Title,Icon,H2} from 'native-base';
import {
    AsyncStorage,AppRegistry,Image
  } from 'react-native';
export default class Referral extends Component {
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
            <Title>Your Offers</Title>
          </Body>
         
        </Header>
        <Content>
          <Card>
            <CardItem header>
            <Image source={require('./../asset/img/offer1.jpg')} style={{height: 350, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                <Text>
               Your Coupon Code 
                </Text>
    
              </Body>
              </CardItem>
              <CardItem>
              <Body style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
            
        <H2>1235454</H2>
              </Body>
              </CardItem>
           

            <CardItem footer style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
              <Text>12/02/2018 Expiration date</Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Offers', () => Offers);