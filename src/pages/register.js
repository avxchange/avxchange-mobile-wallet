import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image   } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { createWallet } from '../functions/cryptic.js'
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

const sha256 = require('sha256');

class register extends Component {

   constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      checked: false,
      disabled: true,
      restrictionsUsername: '',
      restrictionsPassword: ''

    }
  }

  register = () =>{
    console.log(this.state.password, this.state.confirmPassword, this.state.username)

    if(this.state.confirmPassword =="" || this.state.password =="" || this.state.username ==""){
      alert("Fill up all fields")
    }

    else if(this.state.password != this.state.confirmPassword){
      alert("Passwords do not match")      
    }

    else if(this.state.checked == false){
      alert("Agree to our terms and policies")      
    }

    else if(this.state.restrictionsPassword != "" || this.state.restrictionsUsername != ""){
      alert("please follow the restrictions")
    }

    else{
      alert('proceed')
      // var data = createWallet(this.state.username, this.state.password);
      // AsyncStorage.setItem('publicKey', data["publicKey"]);
      // AsyncStorage.setItem('hasWallet', "1");
  
      // console.log('-----------------')
      // AsyncStorage.getItem('publicKey').then((value) => console.log("HER",value, "her"))
      // console.log('-----------------')
  
      // // console.log("data",data)
      // Actions.credentials(data)
    }

  }

  checkUsername = (text) =>{
    var format = /[ !@#$%^&*()+\=\[\]{};':"\\|,<>\/?]/;
    this.setState({ username: text })
    var username = text;
    console.log(username);
    console.log(username.length);
    if(username.length < 5){
      this.setState({ restrictionsUsername: "*username should have 5 or more characters" });
    }

    else if(username.length > 32){
      this.setState({ restrictionsUsername: "*username should have less than 32 characters" });
    }

    else if(format.test(username)){
      this.setState({ restrictionsUsername: "*username can only contain letters, numbers, dashes(-), periods(.), and underscores(_)" });

    }

    else{
      this.setState({restrictionsUsername: ""})
    }
  }

  checkPassword = (text) =>{
    var format = /[ !@#$%^&*()+\=\[\]{};':"\\|,<>\/?]/;
    var number = /[ 1234567890/?]/;

    this.setState({ password: text })
    var password = text;

    if(password.length < 8){
      this.setState({ restrictionsPassword: "*password should have 8 or more characters" });
    }

    else if(password.length > 128){
      this.setState({ restrictionsPassword: "*password should have less than 128 characters" });
    }

    else if(!format.test(password)){
      this.setState({ restrictionsPassword: "*password should contain one special character (e.g. !,@,#,$ etc." });

    }

    else if(!number.test(password)){
      this.setState({ restrictionsPassword: "*password must contain atleast 1 number" });

    }

    else{
      this.setState({restrictionsPassword: ""})
    }
  }

  render() {
    // console.log(AsyncStorage.getItem('privateKey').then((value) => console.log("PK:",value)))
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <Image style = {styles.icon_back} source={require('../images/back.png')}  />
            <Text style = {styles.header_text}>Create Wallet</Text>
          </View>
          <View style = {styles.body_container}>
            <View style = {styles.input_container}>
              <TextInput placeholder='Username'  value = {this.state.username} onChangeText={(text) =>{ 
                this.checkUsername(text)
                }}/>
            </View>
            <Text style = {styles.t1}>{this.state.restrictionsUsername}</Text>
            <View style = {styles.input_container}>
              <TextInput placeholder='Password'  value = {this.state.password} onChangeText={(text) =>{ 
                this.checkPassword(text)
                }}/>
            </View>
            <Text style = {styles.t1}>{this.state.restrictionsPassword}</Text>
            <View style = {styles.input_container}>
              <TextInput placeholder='Confirm Password'  value = {this.state.confirmPassword} onChangeText={(text) =>{ this.setState({ confirmPassword: text });}}/>
            </View>
            {/* <Text style = {styles.t1}>*Create Wallet</Text> */}
            <View style = {styles.c1}>
              {/* <View style = {styles.c2}> */}
                <CheckBox 
                  title = 'By checking, you agree to our Terms, Data Policy and Cookies Policy.'
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
              {/* </View>
              <View style = {styles.c3}>
                <Text style = {styles.t1}>By checking, you agree to our Terms, Data Policy and Cookies Policy. </Text>
              </View> */}
            </View>
            
            <View style = {styles.button_container}>
              <TouchableOpacity style={styles.import_Button} onPress={ this.register }>                
                <Text style = {styles.text_Button}>  Create Wallet </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

export default register

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
    paddingVertical : '10%',
    paddingHorizontal: '5%'
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
    marginTop: '5%',
    // backgroundColor: 'pink'

  },

  button_container : {
    // backgroundColor: 'blue',
    height : '20%',
    alignItems : 'center',
    justifyContent : 'flex-start'
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

  c1 : {
    marginTop: '20%',
    height: '20%',
    // backgroundColor: 'yellow',
    alignItems : 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  c2:{
    // height: '10%',
    width: '30%',
    // backgroundColor: 'orange',
    alignItems : 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',

  },
  c3:{
    // height: '10%',
    width: '70%',
    // backgroundColor: 'orange',
    alignItems : 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',

  },

  t1: {
    fontSize: responsiveFontSize(1.5),
    marginHorizontal : '5%',
    color : 'red'

  }
});