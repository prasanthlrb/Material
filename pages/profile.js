import React, { Component } from 'react';
import { Image,AppRegistry,StatusBar,View,AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,Title,Footer,FooterTab,H2,Spinner  } from 'native-base';
export default class Guest extends Component {
    constructor(){
        super()
        this.state ={
            data:[],
            loader:true,
            data1:[],
            userName:''

        }
      }
    getData(){
        return fetch('http://material.kashousing.in/material/view_material')
       .then((response) => response.json())
       .then((responseJson) => {
        this.setState({data: responseJson});
        this.setState({loader: false});
       })
       .catch((error) => {
         console.error(error);
       });
       
       }
       getDetails(){
        const {state} = this.props.navigation;
          let phone = state.params.phoneno;
          return fetch('http://material.kashousing.in/users/get_phone/'+phone)
          .then((response) => response.json())
          .then((responseJson) => {
           this.setState({data1: responseJson});
           let userData = this.state.data1.map(function (userDetails, index) {
           
            let myArray={
              userName : userDetails.name,
              userId :userDetails.id,
              referral:userDetails.our_code
             }
             AsyncStorage.setItem('myArray',JSON.stringify(myArray));
          });
         
           
          })
          .catch((error) => {
            console.error(error);
          });
       
      }
      // getUser = async()=>{
      //   let myArray = await AsyncStorage.getItem('myArray');
      //   let d =JSON.parse(myArray);
      
       
      // }
    componentDidMount() {
        this.getData();  
        this.getDetails();    
        // this.getUser();  
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
            <Button block bordered onPress={()=> navigate('Orderfinal',{user: matid})}>
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
          {
              this.state.loader ?
              <Spinner color='blue' />
              :
              <View/>
          }
        
        {articles}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={()=> this.props.navigation.navigate("Order")}>
              <Icon name="cart" />
              <Text>Orders</Text>
            </Button>
            <Button vertical active onPress={()=> this.props.navigation.navigate("Offers")}>
              <Icon active name="star" />
              <Text>Offers</Text>
            </Button>
            <Button vertical onPress={()=> this.props.navigation.navigate("Home")}>
              <Icon name="ios-exit" />
              <Text>Exit</Text>
            </Button>
          </FooterTab>
        </Footer>
          
      </Container>
    );
  }
}
AppRegistry.registerComponent('profile', () => profile);