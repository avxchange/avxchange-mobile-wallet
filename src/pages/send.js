import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image, Clipboard  } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { decryptWallet } from '../functions/cryptic.js'
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getBalance} from '../functions/api.js';
import { getAmountWithFee, getFee, getMax } from '../functions/converter.js';

const sha256 = require('sha256');

class send extends Component {

   constructor() {
    super()
    this.state = {
      recipientKey:"",
      amount: ""
    }
  }

  componentDidMount = () =>  {
  }

  openScanner(){
    Actions.scanner({from: 'send'});
  };

  next = () =>{
    getBalance(this.props.publicKey).then((value) => 
    {
      if (this.state.recipientKey == ""){
        alert("Please fill up recipient key")
      }

      else if(this.state.amount == ""){
        alert("Please fill up amount")
      }

      else if(value >= getAmountWithFee(this.state.amount)){
        Actions.confirmation({publicKey: this.props.publicKey,recipientKey: this.state.recipientKey, amount: this.state.amount, fee: getFee(this.state.amount)})  
      }

      else{
        alert("Insufficient Balance")
      }
    })
  };

  back = () =>  {
    Actions.pop()
  };

  async paste() {
    var content = await Clipboard.getString();
    this.setState({ recipientKey: content })
  };

  max = () =>{
    getBalance(this.props.publicKey).then((value) => 
    this.setState({ 
        amount: getMax(value),   
    }))
  };


  render() {
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <TouchableOpacity onPress={ this.back }> 
                <Image style = {styles.icon_back} source={require('../images/back.png')}  />
            </TouchableOpacity>
            <Text style = {styles.header_text}>Send AVX Token</Text>
          </View>
          <View style = {styles.body_container}>
          <View style = {styles.c1}>
                <Text>Recipient Address</Text>
            </View>
            <View style = {styles.c2}>
              <TextInput style = {styles.i1} onChangeText={(text) =>{ this.setState({ recipientKey: text })}} value={this.state.recipientKey}/>
            </View>
            <View style = {styles.c3}>
              <TouchableOpacity  onPress = { () => this.paste()}>
                <Text style = {styles.t1}>Paste</Text>                
              </TouchableOpacity>
            </View>
            <View style = {styles.c3}>
              <TouchableOpacity  onPress = { () => this.openScanner()}>
                <Image style = {styles.qr_icon} source={require('../images/qr.png')}/>
              </TouchableOpacity>
            </View>
            <View style = {styles.c2}>
              <TextInput style = {styles.i1} placeholder='AVX' keyboardType={'numeric'} onChangeText={(text) =>{ this.setState({ amount: text })}} value={this.state.amount}/>
            </View>
            <View style = {styles.c3}>
              <TouchableOpacity  onPress = { () => this.max()}>
                <Text style = {styles.t1}>Max</Text>                
              </TouchableOpacity>
            </View>
            <View style = {styles.c3}>
              <TouchableOpacity  onPress = { () => this.openScanner()}>
                <Text style = {styles.t1}>USD</Text>                
              </TouchableOpacity>
            </View>
            <View style = {styles.c4}>
              <TouchableOpacity style={styles.import_Button} onPress={ this.next }>                
                <Text style = {styles.text_Button}> Next </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
    );
  }
}

export default send

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
    flexDirection: 'row',
    flexWrap: 'wrap'
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
   
  c1: {
    height: "10%",
    width: "100%",
    justifyContent: 'flex-end',
    marginLeft: '5%'
  },

  c2: {
    height: "15%",
    width: "65%",
    marginLeft: '5%',
    borderBottomWidth: responsiveHeight(0.2),
    borderColor: 'lightgray',
    justifyContent: 'flex-end',
  },
  
  c3: {
    height: "15%",
    width: "15%",
    borderBottomWidth: responsiveHeight(0.2),
    borderColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  c4: {
    height: "20%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  qr_icon : {
    ...reuse.icon,
  },

  t1 : {
    marginBottom: "15%",
    fontWeight: 'bold'
  },

  i1 : {
    marginBottom: '5%'
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