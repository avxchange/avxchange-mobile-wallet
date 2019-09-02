import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, ImageBackground, Text, TouchableOpacity, StatusBar } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import reuse from '../styles/reuse.js';

import { Actions } from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';


export default class Selection extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
 
    };
  }
  createWallet(){
    Actions.createmnemonic();
  };

  importWallet(){
    Actions.login();  
  }

  componentDidMount = () =>  {
    
    AsyncStorage.getItem('hasWallet').then((value) => 
    {
      if(value == "1"){
        AsyncStorage.getItem('publicKey').then((value) => 
        {
          Actions.dashboard({'publicKey':value })

        })
      }

      else{
        this.setState({ loading: false })
      }
    })

  }


  render() {
      if(this.state.loading){
        return( 
          <View style={styles.loader}> 
            <ActivityIndicator size="large" color="#0c9"/>
          </View>
      )}
      return (
        <ImageBackground source={require('../images/selectionBG.png')} style={{width: '100%', height: '100%'}}>
          {/* <StatusBar hidden = {true}/> */}
          <View style = {styles.container}>
            <View style = {styles.text_Container}>
              <Text style = {styles.text_Content_1}> Wallet Account </Text>
              <Text style = {styles.text_Content_2}> Get a free consultation to get your idea off the ground by securing the funding you need </Text>
            </View>
            <View style = {styles.button_Container}>
                <TouchableOpacity style={styles.create_Button} onPress={ this.createWallet }>         
                  <Text style = {styles.text_Button}> Create Wallet </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.import_Button} onPress={ this.importWallet }>                
                  <Text style = {styles.text_Button}>  Import Wallet </Text>
                </TouchableOpacity>
             </View>
          </View>
        </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  //containers
  container : {
    flex: 1,
    flexDirection : 'column',
    justifyContent : 'flex-end',
    alignItems : 'stretch',
  },

  text_Container : {
    height : '20%',
    alignItems : 'center',
    padding: '4%',
  },

  button_Container : {
    height : '25%',
    alignItems : 'center',
  },

  //buttons
  create_Button :{
    ...reuse.button,
    backgroundColor : 'red'
  },

  import_Button :{
    ...reuse.button,
    backgroundColor : 'black'
  },

  //text
  text_Button : {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },

  text_Content_1 : {
    textAlign : "center",
    color : "white",
    margin: "2%",
    fontSize: responsiveFontSize(3),

  },

  text_Content_2 : {
    textAlign : "center",
    color : "white",
    margin: "2%",
    fontSize: responsiveFontSize(1.5),

  },



});

