import { StyleSheet } from "react-native";

export default StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    caption: {
        fontSize: 12,
        paddingLeft:10,
        fontWeight:'300',
        fontFamily:'Roboto-Regular',
        color:'#000000'
    },
    drawerSection: {
        paddingTop:20
    },
    reminderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    compView:{
        marginBottom:20,
    },
    compText:{
        paddingLeft:10,
        fontSize: 24,
        fontFamily:'BebasNeue-Regular',
        fontWeight: 'normal',
        letterSpacing:2,
        color:'#000000'
    },
});