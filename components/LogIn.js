import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import styles from './css/login';
import {useDispatch} from 'react-redux';
import {storeEmail, isLoggedin, populateUserData} from '../redux/userActions';
import {
  loggedIn,
  onGoogleButtonPress,
  onFacebookButtonPress,
  getUser,
  storeUserInFireBase,
} from '../Firebase/FirebaseAuth/FirebaseHandler';
import {historyData} from '../redux/action';
import firestore from '@react-native-firebase/firestore';

function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const google = () => {
    setIsLoading(true);
    onGoogleButtonPress().then(response => {
      setIsLoading(false);
      console.log(`google login`, response);

      firestore()
        .collection('Users')
        .doc(response.additionalUserInfo.profile.email)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            dispatch(isLoggedin(true));
            dispatch(storeEmail(response.additionalUserInfo.profile.email));
            let obj1 = documentSnapshot.data();
            console.log('obj from firebase', obj1);
            dispatch(populateUserData(obj1));
            dispatch(historyData(obj1.exerciseDetails));
            navigation.reset({
              index: 0,
              routes: [{name: 'MenuDrawer'}],
            });
          } else {
            let obj = {
              name: response.additionalUserInfo.profile.name,
              email: response.additionalUserInfo.profile.email,
              age: 'N/A',
              height: 'N/A',
              gender: 'N/A',
              dob: 'N/A',
              exerciseDetails: [],
            };
            console.log(`obj=======`, obj);
            storeUserInFireBase(obj);
            dispatch(storeEmail(response.additionalUserInfo.profile.email));
            dispatch(populateUserData(obj));
            dispatch(isLoggedin(true));
            navigation.reset({
              index: 0,
              routes: [{name: 'MenuDrawer'}],
            });
          }
        });
    });
  };

  const facebook = () => {
    onFacebookButtonPress().then(response => {
      console.log('facebook response', response);

      firestore()
        .collection('Users')
        .doc(response.additionalUserInfo.profile.email)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);

          if (documentSnapshot.exists) {
            dispatch(isLoggedin(true));
            dispatch(storeEmail(response.additionalUserInfo.profile.email));
            let obj1 = documentSnapshot.data();
            console.log('obj from firebase', obj1);
            dispatch(populateUserData(obj1));
            dispatch(historyData(obj1.exerciseDetails));
            navigation.reset({
              index: 0,
              routes: [{name: 'MenuDrawer'}],
            });
          } else {
            let obj = {
              name: response.additionalUserInfo.profile.name,
              email: response.additionalUserInfo.profile.email,
              age: 'N/A',
              height: 'N/A',
              gender: 'N/A',
              dob: 'N/A',
              exerciseDetails: [],
            };
            storeUserInFireBase(obj);
            dispatch(storeEmail(response.additionalUserInfo.profile.email));
            dispatch(populateUserData(obj));
            dispatch(isLoggedin(true));
            navigation.reset({
              index: 0,
              routes: [{name: 'MenuDrawer'}],
            });
          }
        });
    });
  };

  const goToHome = async () => {
    try {
      let logged = await loggedIn(email, password);
      console.log('try block executed');

      if (logged) {
        console.log('if block executed');
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'MenuDrawer'}],
        });
        dispatch(isLoggedin(true));
        dispatch(storeEmail(email));
        console.log('email from login', email);
        let obj = await getUser(email);
        console.log('obj from firebase', obj);
        dispatch(populateUserData(obj));
        dispatch(historyData(obj.exerciseDetails));
      }
    } catch (error) {
      if (error === 'auth/invalid-email') {
        Alert.alert('Message', 'This emial address is invalid!');
        setIsLoading(false);
        return;
      }

      if (error === 'auth/wrong-password') {
        Alert.alert('Message', 'Incorrect password!');
        setIsLoading(false);
        return;
      }

      if (error === 'auth/user-not-found') {
        Alert.alert(
          'Message',
          'There is no user record corresponding to this identifier!',
        );
        setIsLoading(false);
        return;
      }
    }
  };

  const checkTextInput = () => {
    if (!email.trim()) {
      Alert.alert('Message', 'Please Enter Email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Message', 'Please Enter Password.');
      return;
    }
    setIsLoading(true);
    goToHome();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.signinView}>
          <Text style={styles.signinText}>Sign In</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.socialText}>
            {/* Sign In with one of the following. */}
          </Text>

          {/* <View style={styles.socialLogosView}>
            <TouchableOpacity
              style={styles.socialLogoView}
              onPress={() => {
                google();
              }}>
              <Image
                style={{maxWidth: 100, maxHeight: 30, resizeMode: 'contain'}}
                source={require('./assets/logos/Google.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialLogoView}
              onPress={() => facebook()}>
              <Image
                style={{maxWidth: 100, maxHeight: 30, resizeMode: 'contain'}}
                source={require('./assets/logos/Facebook.png')}
              />
            </TouchableOpacity>
          </View> */}

          <View style={styles.inputTitleView}>
            <Text style={styles.inputTitleText}>E-mail</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="tim@apple.com"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          {isLoading && (
            <View style={{position: 'absolute', zIndex: 1, bottom: 10}}>
              <ActivityIndicator size="large" color="#AA3FA6" />
            </View>
          )}

          <View style={styles.inputTitleView}>
            <Text style={styles.inputTitleText}>Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Enter your password"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>

          <TouchableOpacity
            onPress={() => checkTextInput()}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerBtn}>Register</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.fotgotBtnView}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotBtn}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LogIn;
