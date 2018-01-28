import React, { Component } from 'react';
import { Container, Header, Content, Spinner } from 'native-base';
export default class SpinnerExample extends Component {
    getData(){
        const {state} = this.props.navigation;
        let id = state.params.removepro;
        return fetch('http://material.kashousing.in/users/update_order_cancel/'+id)
        .then((response) => response.json())
        .then((responseJson) => {
        this.props.navigation.navigate("Order");
        })
        .catch((error) => {
          console.error(error);
        });
        
    }
    componentDidMount() {
       this.getData(); 
    }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color='blue' />
        </Content>
      </Container>
    );
  }
}