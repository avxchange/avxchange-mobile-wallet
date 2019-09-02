import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image, Clipboard  } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { convertToDollars } from '../functions/converter.js'
import { Actions } from 'react-native-router-flux';

const sha256 = require('sha256');

class credentials extends Component {

   constructor() {
    super()
    this.state = {
      recipientKey:"",
      amount: ""
    }
  }

  componentDidMount = () =>  {
    // this.setState({ recipientKey: this.props.recipientKey })
    // this.setState({ amount: this.props.amount })

  }

  copy = () =>  {
    alert("Copied")
    Clipboard.setString(this.props.privateKey);
  }

  proceed = () =>  {
      console.log(this.props.publicKey)
    Actions.dashboard({'publicKey' :this.props.publicKey})
  }

  render() {
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <Image style = {styles.icon_back} source={require('../images/back.png')}  />
            <Text style = {styles.header_text}>Confirmation</Text>
          </View>
          <View style = {styles.body_container}>
            <View style = {styles.c1}>
                <Image style = {styles.send_icon} source={require('../images/padlock.png')}  />
                <Text style = {styles.t1}>Private Key</Text>
                {/* <Text style = {styles.t2}>(US${convertToDollars(this.state.amount)})</Text> */}
            </View>
            {/* <View style = {styles.c2}>
                <Text style = {styles.t3}>From</Text>
            </View> */}
            <View style = {styles.c3}>
                <Text style = {styles.t3}>{this.props.privateKey}</Text>
            </View>
            <View style = {styles.c2}>
                <TouchableOpacity onPress={ this.copy }>                
                    <Image style = {styles.clipboard_icon} source={require('../images/clipboard.png')}  />                    
                </TouchableOpacity>
                <Text style = {styles.t3}>Copy and Save your private key, it will be used in exporting and retrieval of the wallet.</Text>
            </View>
            {/* <View style = {styles.c3}>
                <Text style = {styles.t3}>{this.state.recipientKey}</Text>
            </View>
            <View style = {styles.c4}>
                <Text style = {styles.t4}>Total</Text>
            </View>
            <View style = {styles.c5}>
                <Text style = {styles.t2}>(US${convertToDollars(this.state.amount)})</Text>
            </View> */}
            <View style = {styles.c6}>
                <TouchableOpacity style={styles.b1} onPress={ this.proceed }>                
                    <Text style = {styles.text_Button}> Proceed </Text>
                </TouchableOpacity>
            </View>

          </View>
        </View>
    );
  }
}

export default credentials

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
    flexDirection: 'row'
  
  },

  c2: {
    height: "15%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    // borderBottomWidth: responsiveHeight(0.2),
    // borderColor: 'lightgray',
  
  },

  c3: {
    height: "10%",
    width: "100%",
    borderBottomWidth: responsiveHeight(0.2),
    borderColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
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


  send_icon : {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    marginRight: "3%"
    
  },

  clipboard_icon : {
    height: responsiveWidth(14),
    width: responsiveWidth(14),
    marginBottom: "5%",
    marginTop: "5%"
    
  },

  t1: {
    fontSize: responsiveFontSize(4),
    // color: 'red',
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