import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    forgotImgView:{
        // paddingTop: 50,
        marginBottom:20,
    },
    verifyText:{
        fontFamily:'Roboto-Medium',
        fontSize:14,
        fontWeight:'normal',
        textAlign: 'center',
        padding:16,
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
      sendBtn: {
        width: "90%",
        borderRadius: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#BA4C9D'
      },
      sendText:{
        fontSize: 14,
        padding:16,
        fontFamily: 'Roboto-Medium',
        fontWeight:'normal',
        color: '#000000',
        fontWeight: 'bold',
      },
})