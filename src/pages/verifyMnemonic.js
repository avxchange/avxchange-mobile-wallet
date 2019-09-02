import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, StatusBar, Image, TouchableWithoutFeedback   } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import reuse from '../styles/reuse.js';
import { decryptWallet } from '../functions/cryptic.js'
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {mnemonic} from '../functions/random.js';
import { getAmountWithFee, getFee, getMax } from '../functions/converter.js';

const sha256 = require('sha256');

class Verifymnemonic extends Component {

   constructor() {
    super()
    this.state = { 
        basePhrase:["hanabi", "miya", "claude", "layla", "zilong", "mirana", "drow", "terrorblade", "antimage", "pudge", "puck", "shadowfiend"],        
        phrase:["hanabi", "miya", "claude", "layla", "zilong", "mirana", "drow", "terrorblade", "antimage", "pudge", "puck", "shadowfiend"],
        chosenPhrase:[],
        isCorrect: '',
        show: false,
    }
  }

  componentDidMount = () =>  {
    console.log(mnemonic())
  }

  back = () =>  {
    Actions.pop()
  };

  chooseWord = (id) =>  {
    
    var chosenPhraseHolder = this.state.chosenPhrase;
    chosenPhraseHolder.push(this.state.phrase[id])

    var phraseHolder = this.state.phrase;
    // delete phraseHolder[id];
    phraseHolder.splice(id,1);
  
    this.setState({ 
        chosenPhrase: chosenPhraseHolder,   
        phrase: phraseHolder, 
    })

    this.setState({ 
        isCorrect: this.checkWord()
    })
    console.log(this.checkWord())
    if(this.checkPhrase()){
        this.setState({ show: true });

    }
  };

  removeWord = (id) =>  {
    
    var phraseHolder = this.state.phrase;
    phraseHolder.push(this.state.chosenPhrase[id])

    var chosenPhraseHolder = this.state.chosenPhrase;
    // delete chosenPhraseHolder[id];
    chosenPhraseHolder.splice(id,1);
  
    this.setState({ 
        chosenPhrase: chosenPhraseHolder,   
        phrase: phraseHolder, 
    });

    this.setState({ 
        isCorrect: this.checkWord()
    })
  };

  checkWord = (id) =>  {
    
    var l = this.state.chosenPhrase.length;
    // console.log("base:",this.state.basePhrase)
    // console.log("chosen:", this.state.chosenPhrase)

    for(var a = 0; a < l; a++){
        if(this.state.basePhrase[a] != this.state.chosenPhrase[a]){
            return "Incorrect";
        }
    }
    
    return '';
  };

  checkPhrase = (id) =>  {
        var arr1 = this.state.basePhrase;
        var arr2 = this.state.chosenPhrase;

        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }

  render() {
      return (
        <View style = {styles.container}> 
        <StatusBar hidden />  
          <View style = {styles.header_container}>
            <TouchableOpacity onPress={ this.back }> 
                <Image style = {styles.icon_back} source={require('../images/back.png')}  />
            </TouchableOpacity>
            <Text style = {styles.header_text}>Backup Phrase</Text>
          </View>
          <View style = {styles.body_container}>
            <View style = {styles.c1}>
                <Image style = {styles.i1} source={require('../images/blocks.png')} />
            </View>

            <View style = {styles.c2}>
                <Text style = {styles.t1}>Tap the words to put them next to each other in the correct order.</Text>    
            </View>

            <View style = {styles.c3}>  
                {
                    this.state.chosenPhrase.map((item, index) => (

                        <TouchableOpacity style = {styles.c7} key = {index} onPress={() => this.removeWord(index)}>
                            <Text style = {styles.t2}>{this.state.chosenPhrase[index]}</Text>
                        </TouchableOpacity>

    
                    ))
                  }
            </View>

            <View style = {styles.c4}> 
                {
                    this.state.phrase.map((item, index) => (

                        <TouchableOpacity style = {styles.c6} key = {index} onPress={() => this.chooseWord(index)}>
                            <Text style = {styles.t1}>{this.state.phrase[index]}</Text>
                        </TouchableOpacity>

    
                    ))
                  }
            </View>

           
                
                {this.state.show ? (
                    <View style = {styles.c9}>
                        <Text style = {styles.t3}>Great! Well done.</Text>
                        <TouchableOpacity style={styles.import_Button} onPress={ this.importWallet }>                
                            <Text style = {styles.text_Button}>  Next </Text>
                        </TouchableOpacity>
                    </View>
                ) : 
                <View style = {styles.c8}>
                    <Text style = {styles.t1}>{this.state.isCorrect}</Text>                
                </View>  
                
                }

          </View>
        </View>
    );
  }
}

export default Verifymnemonic

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },

    header_container : {
        ...reuse.header_container
    },

    body_container : {
        flex : 8,
        backgroundColor : 'black',
        alignItems: 'center',

    },

    header_text : {
        ...reuse.header_text
    },

    icon_back : {
        ...reuse.icon_back
    },

    c1 : {
        height: '15%',
        width: '100%',
    //   backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    c2 : {
        height: '10%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    c3 : {
        height: '30%',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: '3%',
        padding: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    c4 : {
        width: '80%',
        // height: '30%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'blue',
        // marginBottom: '5%',
        padding: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    c6 : {
        padding: '3%',
        borderRadius : 60,
        borderWidth: 0.5,
        borderColor: 'white',
        margin: "1%",
    },

    c7 : {
        padding: '3%',
        borderRadius : 60,
        borderWidth: 0.5,
        borderColor: 'black',
        margin: "1%"
    },

    c8 : {
        height: '5%',
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        // backgroundColor: 'red'
    },

    c9 : {
        // backgroundColor : 'white',
        marginTop: '15%',
        height: '30%',
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        // backgroundColor: 'red'
    },

    i1: {
        height: responsiveWidth(20),
        width: responsiveWidth(30),
    },

    t1 : {
        fontSize: responsiveFontSize(1.5),
        color: 'white',
        textAlign: 'center'
    },

    t2 : {
        fontSize: responsiveFontSize(1.5),
        color: 'gray',
        textAlign: 'center'
    },

    t3 : {
        fontSize: responsiveFontSize(2),
        color: 'red',
        textAlign: 'center'
    },

    import_Button :{
        ...reuse.button,
        backgroundColor : 'red'
      },
    
      //text
    text_Button : {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
    },
 
});