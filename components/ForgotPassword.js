import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './css/forgotpassword';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const sendEmail = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(alert('Please check your email...'))
      .catch(function (e) {
        console.log(e);
      });
  };

  const checkInput = () => {
    if (!email.trim()) {
      Alert.alert('Message', 'Please Enter Email.');
      return;
    }
    sendEmail(email);
  };

  return (
    <SafeAreaView
      style={{backgroundColor: '#ffffff', flex: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.forgotImgView}>
          <Image
            style={{resizeMode: 'contain', maxHeight: 250, maxWidth: 250}}
            source={require('./assets/logos/forgot.jpg')}
          />
          <Text style={styles.verifyText}>Verify your e-mail</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.placeholderText}
            placeholder="enter your e-mail"
            placeholderTextColor="#000000"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={email => setEmail(email)}
          />
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={() => checkInput()}>
          <Text style={styles.sendText}>Send Instruction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
