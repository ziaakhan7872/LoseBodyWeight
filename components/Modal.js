import React from 'react';
import {Modal, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const ModalMessage = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isModalVisible}
      onRequestClose={props.CloseModal}
    >
        <View style={styles.modalView}>
            <View style={styles.boxView}>
               
                <View style={styles.messageView}>
                    <Text style={styles.messageText}>{props.msg}</Text>
                </View>

                <View style={styles.btnView}>
                    <View/>
                    <TouchableOpacity onPress={()=>props.function1()}>
                        <Text style={styles.messageText2}>{props.btn1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.function2()}>
                        <Text style={styles.messageText2}>{props.btn2}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  boxView: {
    backgroundColor: 'rgba(108, 22, 74, 0.8)',
    height:200,
    width:'90%',
    borderRadius:20
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent:'center',
    alignItems: 'center',
    flex:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  messageView:{
    height:'50%',
    paddingTop:30,
    paddingLeft:20
  },
  messageText:{
    color: '#fff',
    fontSize:14,
    fontFamily:'Roboto-Medium'
  },
  messageText2:{
    color: '#fff',
    fontSize:12,
    fontFamily:'Roboto-Medium'
  },
  btnView:{
      flexDirection:"row",
      height:'50%',
      justifyContent:'space-between',
      paddingLeft:20,
      paddingRight:20,
      paddingTop:30
    }

})

export default ModalMessage;