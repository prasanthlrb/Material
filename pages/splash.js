import React, { Component } from 'react';
import { Container, Header, Content, H1, H2, H3, Text } from 'native-base';

export default class Welcome extends Component {
    componentDidMount() {
        setTimeout(()=>{
            this.props.navigation.navigate('Home');
        },1000)
       
    }
    
  render() {
      
    return (
      <Container>
        <Header />
        <Content>
          <H1>Header One</H1>
          <H2>Header Two</H2>
          <H3>Header Three</H3>
          <Text>Default</Text>
        </Content>
      </Container>
    );
  }
}