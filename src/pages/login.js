import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image  } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { decryptWallet } from '../functions/cryptic.js'
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

const sha256 = require('sha256');

class login extends Component {

   constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      privateKey: '',
      wallet:'',
      authenticated: false
    }
  }

  componentDidMount = () => AsyncStorage.getItem('privateKey').then((value) => this.setState({ 'privateKey': value }))
                         .then(AsyncStorage.getItem('username').then((value) => this.setState({ 'username': value })))
                         .then(AsyncStorage.getItem('password').then((value) => this.setState({ 'password': value })))
                         .then(AsyncStorage.getItem('wallet').then((value) => this.setState({ 'wallet': value })))
                        

  openScanner(){
    AsyncStorage.setItem('privateKey', this.state.privateKey);
    AsyncStorage.setItem('wallet', this.state.wallet);
    AsyncStorage.setItem('username', this.state.username);
    AsyncStorage.setItem('password', this.state.password);

    Actions.scanner();
  };

  login = () =>{
    var credentials = {
      username: this.state.username,
      password: this.state.password,
      privateKey: this.state.privateKey,
      wallet: this.state.wallet

    }
    
    if (decryptWallet(credentials)){
      AsyncStorage.setItem('privateKey', this.state.privateKey);
      AsyncStorage.setItem('wallet', this.state.wallet);
      AsyncStorage.setItem('username', this.state.username);
      AsyncStorage.setItem('password', this.state.password);
  
      Actions.dashboard();
    }
    else{
      alert("Invalid Credentials")
    }

  }

  render() {
    console.log(AsyncStorage.getItem('privateKey').then((value) => console.log("PK:",value)))
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <Image style = {styles.icon_back} source={require('../images/back.png')}  />
            <Text style = {styles.header_text}>Import</Text>
          </View>
          <View style = {styles.body_container}>
            <View style = {styles.input_container}>
              <TextInput placeholder='Username'  value = {this.state.username} onChangeText={(text) =>{ this.setState({ username: text });}}/>
            </View>
            <View style = {styles.input_container}>
              <TextInput placeholder='Password'  value = {this.state.password} onChangeText={(text) =>{ this.setState({ password: text });}}/>
            </View>
            <View style = {styles.input_container}>
              <TextInput placeholder='PrivateKey'  value = {this.state.privateKey} onChangeText={(text) =>{ this.setState({ privateKey: text });}}/>
            </View>
            <View style = {styles.input_container}>
              <TextInput style = {styles.text_input} secureTextEntry={true} placeholder='Wallet' value = {this.state.wallet} onChangeText={(text) =>{ this.setState({ wallet: text })}}/>
              <TouchableOpacity  onPress = { () => this.openScanner()}>
                <Image style = {styles.icon} source={require('../images/qr.png')}/>
              </TouchableOpacity>
            </View>
            <View style = {styles.button_container}>
              <TouchableOpacity style={styles.import_Button} onPress={ this.login }>                
                <Text style = {styles.text_Button}>  Import Wallet </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

export default login

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },

  header_container : {
    ...reuse.header_container
  },

  body_container : {
    flex : 8,
    backgroundColor : 'white',
    paddingVertical : '10%'
  },

  header_text : {
    ...reuse.header_text
  },

  free_container : {
    flex : 1,
    backgroundColor : 'white'
  },

  icon_back : {
    ...reuse.icon_back
  },

  icon : {
    ...reuse.icon,
    
  },
   
  input_container : {
    ...reuse.input_container,
  },

  button_container : {
    height : '30%',
    alignItems : 'center',
    justifyContent : 'center'
  },

  text_input : {
    // marginRight: "65%"
    width : "85%"
  },
  
  import_Button :{
    ...reuse.button,
    backgroundColor : 'red',
  },

  text_Button : {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },
});