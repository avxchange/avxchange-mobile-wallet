import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image, Clipboard   } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { createWallet } from '../functions/cryptic.js'
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';

const sha256 = require('sha256');

class Createmnemonic extends Component {

   constructor() {
    super()
    this.state = {
        phrase:["hanabi", "miya", "claude", "layla", "zilong", "mirana", "drow", "terrorblade", "antimage", "pudge", "puck", "shadowfiend"]

    }
  }


  copy = () =>  {
    var copyPhrase = this.state.phrase.toString()
    console.log(copyPhrase);
    Clipboard.setString(copyPhrase);
  }

  next = () =>  {
    Actions.verifymnemonic(this.state.phrase);
  }


  render() {
      return (
        <View style = {styles.container}> 
            <View style = {styles.c1}> 
                <Image style = {styles.i1} source={require('../images/pen.png')} />
            </View>
            <View style = {styles.c2}> 
                <Text style = {styles.t1}>Backup Phrase</Text>
            </View>
            <View style = {styles.c3}> 
                <Text style = {styles.t2}>These 12 words are the only way to restore your AVXChange wallet. SAVE them somewhere safe and secret</Text>
            </View>
            <View style = {styles.c4}> 
                {/* <Text style = {styles.t3}>{this.state.phrase}</Text>     */}
                {
                      this.state.phrase.map((item, index) => (
                        
                            <View key = {index}>
                                <Text style = {styles.c6}>{item}</Text>
                            </View>

      
                      ))
                  }
            </View>
            <View style = {styles.c5}> 
                <TouchableOpacity  style = {styles.o1} onPress = { () => this.copy()}>                 
                    <Image style = {styles.i2} source={require('../images/copy.png')} />
                    <Text style = {styles.t2}>Copy to clipboard</Text>                
                </TouchableOpacity>
            </View>
            <View style = {styles.c7}>
                <TouchableOpacity style={styles.b1} onPress={ this.next }>                
                    <Text style = {styles.t4}> Next </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

export default Createmnemonic

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: 'black',
        alignItems : 'center',
        // justifyContent: 'center',
    },

    c1 : {
        height : '20%',
        // backgroundColor: 'yellow',
        alignItems : 'center',
        justifyContent: 'flex-end',
        marginBottom: '3%'
    },
    c2 : {
        height : '5%',
        // backgroundColor: 'orange',
        alignItems: 'center',
        marginBottom: '3%'
    },
    c3 : {
        height : '10%',
        width: '60%',
        // backgroundColor: 'red',
    },

    c4 : {
        // height : '15%',
        width: '80%',
        backgroundColor: 'white',
        marginBottom: '5%',
        padding: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap'


    },

    c5 : {
        height : '5%',
        alignItems: 'center',
        marginBottom: '3%',
        flexDirection: 'row'
    },

    c6 : {
        padding: '3%'
    },

    c7 : {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1,
        padding: '5%',
        // backgroundColor: 'white'


    },


    i1: {
        height: responsiveWidth(20),
        width: responsiveWidth(20),
    },

    i2: {
        height: responsiveWidth(5),
        width: responsiveWidth(5),
        marginRight: '3%'
    },

    t1 : {
        fontSize: responsiveFontSize(3),
        color: 'white',
    },

    t2 : {
        fontSize: responsiveFontSize(1.5),
        color: 'white',
        textAlign: 'center'
    },

    t3 : {
        fontSize: responsiveFontSize(2),
        // color: 'white',
        textAlign: 'center'
    },

    o1: {
        flexDirection: 'row'
    },

    b1 :{
        ...reuse.button,
        backgroundColor : 'red',
      },

    t4 : {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
    },


  
});