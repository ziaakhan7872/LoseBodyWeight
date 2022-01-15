import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    homeBtn:{
        marginBottom: 20,
        borderColor: '#AA3FA6',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
      },
      buttons:{
        margin: 20,
        width: '90%',
        flex:1
      },
      homeBtnText:{
        color:'#000000',
        fontSize: 22,
        fontWeight: 'normal',
        fontFamily: 'BebasNeue-Regular',
        letterSpacing: 1
      },
      homeHeading:{
        padding:30,
        fontFamily:'BebasNeue-Regular',
        fontSize: 24,
        fontWeight: 'normal',
        letterSpacing: 4,
        color:'#000000'
      },
      titleView:{
        maxHeight:100,
        maxWidth:100,
        justifyContent:'center',
        paddingLeft: 10,
      },
      titleImg:{
      resizeMode: 'cover',
      maxWidth:250,
      maxHeight:100,
      borderTopLeftRadius: 200,
    },
    triangle: {
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
})