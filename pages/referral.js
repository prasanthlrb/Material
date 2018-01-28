import React, { Component } from 'react';
import { Image,AppRegistry,StatusBar,View ,AsyncStorage} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body,Left,Button,Right,Title,Icon,H2} from 'native-base';



export default class Referral extends Component {
  constructor(){
    super()
    this.state ={
      referralcode:''

    }}
  getUser = async()=>{
    let myArray = await AsyncStorage.getItem('myArray');
    let d =JSON.parse(myArray);
  
    this.setState({ referralcode:d.referral});
  }
  componentDidMount() {
    this.getUser(); 
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
            <Title>Invite Friends</Title>
          </Body>
         
        </Header>
        <Content>
          <Card>
            <CardItem header>
            <Image source={require('./../asset/img/referral.png')} style={{height: 350, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Body style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                <Text>
                Share Your referral Code
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
              <H2>{this.state.referralcode}</H2>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}
AppRegistry.registerComponent('Referral', () => Referral);