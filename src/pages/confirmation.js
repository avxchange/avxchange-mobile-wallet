import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image, Clipboard  } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { convertToDollars } from '../functions/converter.js'
import {sendAVX} from '../functions/api.js';
import { Actions } from 'react-native-router-flux';

const sha256 = require('sha256');

class confirmation extends Component {

   constructor() {
    super()
    this.state = {
      recipientKey:"",
      amount: ""
    }
  }

  componentDidMount = () =>  {
  }

  sendAVX = () =>  {
    sendAVX(this.props.publicKey, this.props.recipientKey, this.props.amount, this.props.fee)
    Actions.dashboard({publicKey: this.props.publicKey})
  }

  back = () =>  {
    Actions.pop()
  }

  render() {
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <TouchableOpacity onPress={ this.back }> 
                <Image style = {styles.icon_back} source={require('../images/back.png')}  />
            </TouchableOpacity>
            <Text style = {styles.header_text}>Confirmation</Text>
          </View>
          <View style = {styles.body_container}>
            <View style = {styles.c1}>
              <View style = {styles.c7}>
              <Image style = {styles.send_icon} source={require('../images/send.png')}  />
              <Text style = {styles.t1}>{this.props.amount} AVX</Text>
              </View>
              
              <Text style = {styles.t2}>(US${convertToDollars(this.props.amount)})</Text>
            </View>
            <View style = {styles.c2}>
                <Text style = {styles.t3}>From</Text>
            </View>
            <View style = {styles.c3}>
                <Text style = {styles.t3}>{this.props.publicKey}</Text>
            </View>
            <View style = {styles.c2}>
                <Text style = {styles.t3}>To</Text>
            </View>
            <View style = {styles.c3}>
                <Text style = {styles.t3}>{this.props.recipientKey}</Text>
            </View>
            <View style = {styles.c4}>
                <Text style = {styles.t4}>amount</Text>
                <Text style = {styles.t4}>fee</Text>
                <Text style = {styles.t4}>Total</Text>
            </View>
            <View style = {styles.c5}>
                <Text style = {styles.t2}>{this.props.amount} AVX</Text>
                <Text style = {styles.t2}>{this.props.fee} AVX</Text>
                <Text style = {styles.t2}>{this.props.amount + this.props.fee} AVX</Text>
            </View>
            <View style = {styles.c6}>
                <TouchableOpacity style={styles.b1} onPress={ this.sendAVX }>                
                    <Text style = {styles.text_Button}> Send </Text>
                </TouchableOpacity>
            </View>

          </View>
        </View>
    );
  }
}

export default confirmation

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
    flexWrap: 'wrap',
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
   
  c1: {
    height: "20%",
    width: "100%",
    // borderBottomWidth: responsiveHeight(0.2),
    borderColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row'
  
  },

  c2: {
    height: "5%",
    width: "100%",
    // borderBottomWidth: responsiveHeight(0.2),
    // borderColor: 'lightgray',
  
  },

  c3: {
    height: "10%",
    width: "100%",
    borderBottomWidth: responsiveHeight(0.2),
    borderColor: 'lightgray',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5%'

  
  },

  c4: {
    height: "15%",
    width: "50%",
    // borderBottomWidth: responsiveHeight(0.2),
    // borderColor: 'lightgray',
    justifyContent: "flex-end",
    alignItems: 'flex-start'
  },

  c5: {
    height: "15%",
    width: "50%",
    // borderBottomWidth: responsiveHeight(0.2),
    // borderColor: 'lightgray',
    justifyContent: "flex-end",
    alignItems: 'flex-end'
  },

  c6: {
    height: "20%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
  },

  c7: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


  send_icon : {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    marginRight: "3%"
    
  },

  t1: {
    fontSize: responsiveFontSize(4),
    color: 'red',
    marginRight: "3%"
  },

  t2: {
      fontSize: responsiveFontSize(2.5)
  },

  t3: {
      fontSize: responsiveFontSize(2),
    //   marginLeft: '5%',
      marginBottom: '3%'
  },

  t4: {
    fontSize: responsiveFontSize(2),
    // marginLeft: '5%',
    marginBottom: '3%',
    fontWeight: 'bold'
    },
    
    b1 :{
        ...reuse.button,
        backgroundColor : 'red',
    },

    text_Button : {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
    },


});