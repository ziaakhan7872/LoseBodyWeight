import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    historyHeading:{
        padding:30,
        fontFamily:'BebasNeue-Regular',
        fontSize: 24,
        fontWeight: 'normal',
        letterSpacing: 4,
        color:'#000000'
    },
    nameView:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20,
        },
    nameText:{
        fontFamily:'Robot-Regular',
        fontSize:18,
        fontWeight:'normal',
        color:'#000000'
    },
    dateText:{
        fontFamily:'Robot-Regular',
        fontSize:12,
        fontWeight:'normal',
        paddingTop:5,
        color:'#000000'
    },
    mainView:{
        borderColor:'#AA3FA6',
        borderWidth:1,
        flexDirection:'row',
        minHeight:60,
        width:'90%',
    },
    subView:{
        padding: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    repsView:{
        backgroundColor:'#ECECEC',
        borderRadius:8,
        padding:3
    },
    exName:{
        fontSize:14,
        fontWeight:'normal',
        fontFamily:'Roboto-Regular',
        paddingBottom: 5,
        color:'#000000',
        maxWidth:60
    },
    repsText:{
        fontSize:12,
        fontWeight:'300',
        fontFamily:'Roboto-Regular',
        paddingLeft: 5,
        paddingRight: 5,
        color:'#000000'
    },
    progressView:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:10
    },
})