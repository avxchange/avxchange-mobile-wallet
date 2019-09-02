import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image, ScrollView, RefreshControl  } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import {getBalance, getHistory} from '../functions/api.js';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { convertToDollars } from '../functions/converter.js'
import { getTransactionType, getTransactionOperation } from '../functions/transactionHistoryFunctions.js'
import QRCode from 'react-native-qrcode';

const sha256 = require('sha256');

class dashboard extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[],
      refreshing: false,

      avxBalance: '',
      usdBalance: '',
      privateKey: '',
      history: []
    };
  }

  componentWillMount= () =>  {
      getBalance(this.props.publicKey).then((value) => 
        this.setState({ 
            avxBalance: value,   
            loading: false,
      }))

      getHistory(this.props.publicKey).then((value) => 
        this.setState({ 
          history: value,   
          loading: false,
      }))

      // setInterval(()=> {
      //   getBalance(this.props.publicKey).then((value) => 
      //   this.setState({ 
      //       avxBalance: value,   
      //       loading: false,
      //   }))
        
      // } , 1000);
    
  }

  sendAVX = () =>{
    Actions.send({'publicKey': this.props.publicKey})
  }

  receiveAVX = () =>{
    Actions.qrcode({'publicKey': this.props.publicKey})
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    getBalance(this.props.publicKey).then((value) => 
        this.setState({ 
            avxBalance: value,   
            loading: false,
      })).then(
        getHistory(this.props.publicKey).then((value) => 
        this.setState({ 
          history: value,   
          refreshing: false
      }))
      )

      
  }
 

  render() {
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <Text style = {styles.header_text}>AVX Token Wallet</Text>
            <Image style = {styles.stat_icon} source={require('../images/stat.png')}/>
          </View>
          <View style = {styles.body_container}>

            <View style = {styles.container_1}>
              <Image style = {styles.avx_image} source={require('../images/avx.png')} />
            </View>

            <View style = {styles.container_2}>
              <Text style = {styles.text_1}>{this.state.avxBalance} AVX</Text>
              <Text style = {styles.text_2}>(${convertToDollars(this.state.avxBalance)})</Text>
            </View>

            <View style = {styles.container_3}>
              <Text style = {styles.text_3}>$0.05</Text>
              <Text style = {styles.text_4}>(-0.43%)</Text>
            </View>

            <View style = {styles.button_container}>
              <TouchableOpacity style={styles.import_Button} onPress={ this.sendAVX }>                
                <Text style = {styles.text_Button}>  Send AVX </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.import_Button} onPress={ this.receiveAVX }>                
                <Text style = {styles.text_Button}>  Receive AVX </Text>
              </TouchableOpacity>
            </View>


            <View style = {styles.container_5} >



            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
                  {
                      this.state.history.map((item, index) => (
                      <TouchableOpacity
                          key = {item.id}
                          style = {styles.container}
                          onPress = { () =>{Actions.history()}}>
                          <View style={styles.container_transaction}>
                            <View style={styles.c1}>
                            <Image style={styles.transaction_icon} source={getTransactionType(item.type)} resizeMode="contain"/>
                            </View>

                            <View style={styles.c2}>
                                <Text style={styles.text_5}>{item.date}</Text>
                                <Text style={styles.text_3}>{item.type}</Text>
                                <Text style={styles.address_text}>{item.co.substring(0, 25)}...</Text>
                            </View>

                            <View style={styles.c3}>
                              <Text style={styles.amount_text}>{getTransactionOperation(item.type)}{item.total.substring(0, 6)}</Text>
                              <Text style={styles.text_5}>AVX</Text>
                            </View>
                          </View>


                      </TouchableOpacity>
                      ))
                  }
          </ScrollView>




















            </View>
           

          </View>
        </View>
    );
  }
}

export default dashboard

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
    // paddingVertical : '10%',
    alignItems : "center",
    // justifyContent : "center"
  },

  header_text : {
    ...reuse.header_text,
    marginLeft: "5%"
  },

  free_container : {
    flex : 1,
    backgroundColor : 'white'
  },


  icon : {
    ...reuse.icon,
    
  },

  stat_icon : {
    ...reuse.icon,
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    marginLeft: '40%'
    
  },

  transaction_icon : {
    // ...reuse.icon,
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    
  },
   
  input_container : {
    ...reuse.input_container,
  },

  button_container : {
    height : '8%',
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row',
    // backgroundColor : 'yellow'
  },

  text_input : {
    // marginRight: "65%"
    width : "85%"
  },
  
  import_Button :{
    ...reuse.button,
    backgroundColor : 'red',
    width : '45%'
  },

  text_Button : {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },

  avx_image : {
    height: responsiveWidth(30),
    width: responsiveWidth(30),
  },

  container_1 : {
    alignItems: 'center',
    justifyContent : 'center',
    height : '20%',
    width : '100%',
    // backgroundColor : 'pink'
  },
  container_2 : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    height : '5%',
    width : '100%',
    // backgroundColor : 'gray'
  },
  container_3 : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    height : '5%',
    width : '100%',
    // backgroundColor : 'skyblue'
  },
  container_4 : {
    height : '15%',
    width : '100%',
    backgroundColor : 'pink'
  },
  container_5 : {
    height : '50%',
    width : '90%',
    // backgroundColor : 'pink',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%'
  },

  container_transaction : {
    flexDirection: 'row',
    // backgroundColor: 'orange',
    marginBottom: '3%'
  },

  c1 : {
    // backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%'
  },

  c2 : {
    // backgroundColor: 'yellow',  
    marginLeft: '3%',
    width: '65%',
    justifyContent: 'flex-end'  
  },

  c3 : {
    // backgroundColor: 'gray',
    // width: '20%'
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // flexWrap: 'wrap'
  },

    text_1 : {
      fontSize : responsiveFontSize(3),
      color : 'black',
      marginRight : '5%'
      // fontWeight : 'bold'
    },

    text_2 : {
      fontSize : responsiveFontSize(2),
      color : 'black',
      
    },

    text_3 : {
      fontSize : responsiveFontSize(2),
      color : 'black',
      marginRight : '5%',
      fontWeight : 'bold'
    },

    text_5 : {
      fontSize : responsiveFontSize(1.5),
      color : 'gray',
      
    },

    


});