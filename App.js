import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Text, View} from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';



const initialState = {
    privateKey:"",
    username:"",
    password:""
}
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'PRIVATE_KEY':
          return { privateKey: action.payload }      
        case 'USERNAME':
          return { username: action.payload }     
        case 'PASSWORD':
          return { password: action.payload }     
          
    }
    return state
}

const store = createStore(reducer);

import Routes from './src/routes/routes.js';



export default class App extends Component {
  render() {
      return (
        <View style = {styles.container}>
          <Provider store={store}>
            <Routes />
          </Provider>       
        </View>
    );
  }
}



//styles//

const styles = StyleSheet.create({
  container : {
    // backgroundColor : 'black',
    flex : 1,
    // alignItems : 'center',
    // justifyContent : 'center'
  }
});