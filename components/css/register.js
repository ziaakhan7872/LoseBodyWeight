import { StyleSheet, Dimensions } from "react-native";

const dimension = {
  screenWidth: Dimensions.get('window').width -50,
  screenHeight: Dimensions.get('window').height
  }

const COLOR ={
  color1: '#41016C',
  color2: '#ECECEC'
}

export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    signupText:{
      fontFamily: 'BebasNeue-Regular',
      fontSize: 24,
      color: '#000000',
      textAlign: 'center',
      letterSpacing: 4,
      padding: 30
    },
    signupView:{
      alignItems: 'center',
    },
    inputTitleText:{
      fontSize: 14,
      fontFamily: 'Roboto-Medium',
      textAlign: 'left',
      color:'#000000'
    },
    inputTitleView:{
      width: '90%',
      flexDirection:"row",
      alignItems: 'flex-start',
      marginBottom: 3
    },
    inputView: {
      width: "90%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#AA3FA6",
      backgroundColor: "#FFFFFF",
      marginBottom: 10,
      paddingLeft: 6,
    },
    placeholderText:{
      fontFamily: 'Roboto-Regular',
      fontWeight: '300',
      fontSize: 12,
      color:'#000000'
    },
    smallInputView: {
      minWidth: 100,
      height: 50,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#AA3FA6",
      backgroundColor: "#FFFFFF",
      marginBottom: 10,
      paddingLeft: 6,
    },
    smallInputView2:{
      flexDirection:'row',
      justifyContent:'space-between',
      width: '90%',
      marginBottom:20,
    },
    optionalText:{
      marginTop: 4,
      fontSize: 12,
      fontWeight: '200',
      fontFamily:'Roboto-Regular',
      color:'#000000'
    },
    registerBtn: {
      width: "90%",
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#BA4C9D'
    },
    registerText:{
      fontSize: 14,
      padding:16,
      fontFamily: 'Roboto-Medium',
      fontWeight:'normal',
      color: '#000000',
      fontWeight: 'bold',
    },
    bottomTextView: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      marginBottom: 16,
    },
    bottomText:{
      fontWeight: '300',
      fontFamily:'Roboto-Regular',
      fontSize: 12,
      color:'#000000'
    },
    loginBtn:{
      fontSize:12,
      fontWeight: '300',
      fontFamily:"Roboto-Medium",
      color:'#000000'
    },
    bottomText2:{
      fontSize:12,
      fontWeight: 'normal',
      fontFamily:"Roboto-Medium",
      color:'#000000'
    },
    sexInputView: {
      width: "90%",
      marginTop: -20,
      paddingLeft: 6,
      alignItems: "center",
      flexDirection: 'row',
    },
    calendarInputView: {
      alignItems: "center",
      flexDirection: 'row',
      height: 50,
      minWidth: 100,      
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#AA3FA6",
    },
})