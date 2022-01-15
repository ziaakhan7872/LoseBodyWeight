import { StyleSheet } from "react-native";

export default StyleSheet.create({
      container:{
        justifyContent:'center',
        alignItems:'center',
      },
      doneButton:{
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#440164',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        marginBottom:20
      },
      doneText:{
        fontSize: 12,
        color: 'white',
        fontWeight: 'normal',
        fontFamily:'Roboto-Medium'
      },
      exerciseImgView:{
        marginBottom: 10,
        borderColor: '#AA3FA6',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
      },
      exTitleView:{
        maxHeight:100,
        maxWidth:100,
        justifyContent:'center',
        paddingLeft: 10,
      },
      exerciseText:{
        color:'#000000',
        fontSize: 22,
        fontWeight: 'normal',
        fontFamily: 'BebasNeue-Regular',
        letterSpacing: 1
      },
      triangle:{
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 100,
        borderTopWidth: 100,
        borderRightColor: 'transparent',
        borderTopColor: 'white',
        position: 'absolute',
        zIndex: 1,
      },
      exTitleImg:{
        resizeMode: 'cover',
        maxWidth:250,
        maxHeight:100,
        borderTopLeftRadius: 200,
      },
      buttons:{
        margin: 20,
        width: '90%',
        flex:1
      },
      backIcon:{
        backgroundColor:'#440164',
        borderRadius:20, 
        marginTop: 10, 
        marginLeft:10,
        maxHeight:40, 
        maxWidth:40,
        justifyContent:'center',
        alignItems:'center'
      },
      progressheadingView:{
        padding: 20,
        justifyContent:'center',
        marginTop:20,
        minHeight:80
      },
      progressheadingText:{
        fontFamily:'Roboto-Medium',
        fontSize: 18,
        fontWeight: 'normal',
        color:'#000000'
      },
      pBar:{
        height:40,
        borderRadius:20,
        borderColor:'#AA3FA6',
        backgroundColor:'#ECECEC',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
      },
      placeholderText:{
        fontFamily: 'Roboto-Regular',
        fontWeight: '300',
        fontSize: 12,
        color:'#000000'
      },
      inputView:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center', 
        backgroundColor:'#ECECEC', 
        borderRadius:8, 
        paddingLeft:5,
        paddingRight:5,
        maxHeight:40,
      },
      repsView:{
        marginBottom:30,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
      },
})