import React, { Component } from 'react';
import { Image,AppRegistry,StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Title,H2 } from 'native-base';
export default class Guest extends Component {
    constructor(){
        super()
        this.state ={
            data:[],
        }
      }
    getData(){
        return fetch('http://material.kashousing.in/material/view_material')
       .then((response) => response.json())
       .then((responseJson) => {
        this.setState({data: responseJson});
       })
       .catch((error) => {
         console.error(error);
       });
       
       }
    componentDidMount() {
        this.getData();        
      }
  render() {
    const { navigate } = this.props.navigation;
    let articles = this.state.data.map(function (articleData, index) {
        let imgurl = articleData.url;
        let matid = articleData.id;
              return (
                
              
              <Card key={articleData.id}>
          
              <CardItem cardBody>
            <Image source={{uri:imgurl}} style={{height: 200, width: null, flex: 1}}/>

          </CardItem>
              <CardItem>
              <Left>
            
            <Body>
              <H2>{articleData.title}</H2>
            </Body>
          </Left>
             
            <Right>
            <Button block bordered onPress={()=> navigate('GuestOrder',{user: matid})}>
            <Icon name='cart' />
            <Text>Order Now</Text>
           
          </Button>
            </Right>
          </CardItem>
          </Card>



              )
          });
    return (
      <Container>
       <Header style = {{backgroundColor:'#434b52'}}>
      <StatusBar
		 backgroundColor="#606a72"
		 barStyle="light-content"
	   />
          <Left>
            <Button
              transparent iconLeft 
              onPress={()=> navigate("Home")}>
              <Icon name="arrow-back" style = {{color:'#ffffff'}}/>
             
            </Button>
          </Left>
          <Body>
            <Title>Material List</Title>
          </Body>
          
        </Header>
        <Content>
        {articles}
        </Content>
        
      </Container>
    );
  }
}
AppRegistry.registerComponent('guest', () => guest);