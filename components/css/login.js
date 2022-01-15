import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    signinText:{
      fontFamily: 'BebasNeue-Regular',
      fontSize: 24,
      color: '#000000',
      textAlign: 'center',
      letterSpacing: 4,
      padding: 20
    },
    signinView:{
      flex: 1,
      alignItems: 'center',
      marginBottom: 20,
      paddingTop:30
    },
    socialText:{
      fontFamily:'Roboto-Medium',
      fontSize: 14,
      fontWeight: 'normal',
      color: '#000000',
    },
    inputTitleView:{
      width: '90%',
      flexDirection:"row",
      alignItems: 'flex-start',
      marginBottom: 3
    },
    inputTitleText:{
      fontSize: 14,
      fontFamily: 'Roboto-Medium',
      textAlign: 'left',
      color:'#000000'
    },
    inputView: {
      width: "90%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#AA3FA6",
      backgroundColor: "#FFFFFF",
      marginBottom: 20,
      paddingLeft: 6,
    },
    placeholderText:{
      fontFamily: 'Roboto-Regular',
      fontWeight: '300',
      fontSize: 12,
      color:'#000000'
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
    registerBtn:{
      fontSize:12,
      fontWeight: '300',
      fontFamily:"Roboto-Medium",
      color:'#000000'
    },
    loginBtn: {
      width: "90%",
      borderRadius: 10,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#BA4C9D'
    },
    loginText:{
      fontSize: 14,
      padding:16,
      fontFamily: 'Roboto-Medium',
      fontWeight:'normal',
      color: '#000000',
      fontWeight: 'bold',
    },
    forgotBtn:{
      fontFamily: 'Roboto-Regular',
      fontSize: 12,
      fontWeight: '300',
      color:'#000000'
    },
    fotgotBtnView:{
      borderBottomWidth: 1,
      borderColor: '#000000'
    },
    socialLogosView:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 20,
      width: '100%',
    },
    socialLogoView:{
      borderColor: '#AA3FA6',
      borderWidth: 1,
      borderRadius: 8,
      height: 50,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#ffff',
      padding:10
    },
})