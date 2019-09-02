import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


export default StyleSheet.create({
    button : {
        alignItems : 'center',
        width : "85%",
        padding : "4%",
        borderRadius : 60,
        margin : "2%",
        borderWidth: 0.5,
        borderColor: 'white',
      },

    icon_back : {
      height: responsiveWidth(7),
      width: responsiveWidth(7),
      marginHorizontal : '5%'
    },

    icon : {
      height: responsiveWidth(14),
      width: responsiveWidth(14),
      marginHorizontal : '5%'
    },
  
    header_text : {
      fontSize : responsiveFontSize(2.5),
      color : 'white'
    },

    header_container: {
      flex : 1,
      backgroundColor : 'black',
      flexDirection : 'row',
      alignItems : 'center',
      padding: '5%'
    },

    input_container : {
      borderBottomWidth: responsiveHeight(0.2),
      borderColor: 'lightgray',
      width : '90%',
      height : '10%',
      marginHorizontal : '5%',
      fontSize : responsiveFontSize(2),
      marginTop : '10%',
      // backgroundColor : 'yellow',
      flexDirection : 'row',
      alignItems : 'flex-end'

    }
}); 