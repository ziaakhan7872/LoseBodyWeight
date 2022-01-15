import React, {useState} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import styles from './css/register';
import {useDispatch} from 'react-redux';
import {storeEmail, isLoggedin, populateUserData} from '../redux/userActions';
import {
  createAccount,
  storeUserInFireBase,
} from '../Firebase/FirebaseAuth/FirebaseHandler';

export default function Register({navigation}) {
  const C_Date = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let UpdateDate = date + '-' + month + '-' + year;

    return UpdateDate;
  };

  const [isLoading, setIsLoading] = useState(false);
  const day = C_Date();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [sex, setSex] = useState('');
  const [date, setDate] = useState(day);

  const dispatch = useDispatch();

  let data = [{value: 'Male'}, {value: 'Female'}, {value: 'Other'}];

  const create_user = async () => {
    try {
      let created = await createAccount(email, password);
      console.log('try block executed');

      if (created) {
        console.log('if block executed');
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'MenuDrawer'}],
        });
        dispatch(isLoggedin(true));

        let obj = {
          name: name,
          email: email,
          age: age,
          height: height,
          gender: sex,
          dob: date,
          exerciseDetails: [],
        };

        storeUserInFireBase(obj);
        dispatch(storeEmail(email));
        dispatch(populateUserData(obj));
      }
    } catch (e) {
      if (e === 'auth/email-already-in-use') {
        Alert.alert('Message', 'This email is already exist.');
        setIsLoading(false);
        return;
      }
      if (e === 'auth/invalid-email') {
        Alert.alert('Message', 'This email address is invalid.');
        setIsLoading(false);
        return;
      }
      if (e === 'auth/weak-password') {
        Alert.alert(
          'Message',
          'The given password is invalid. Password should be at least 6 characters!',
        );
        setIsLoading(false);
        return;
      }
    }
  };

  const checkTextInput = () => {
    if (!name.trim()) {
      Alert.alert('Message', 'Please enter your name.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Message', 'Please enter your email.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Message', 'Set your password.');
      return;
    }
    if (!c_password.trim()) {
      alert('Please Enter Confirm Password');
      return;
    }
    if (password !== c_password) {
      alert('Password did not match!!');
      return;
    }
    if (!age.trim()) {
      Alert.alert('Message', 'Please enter your age.');
      return;
    }
    if (!sex.trim()) {
      Alert.alert('Message', 'You did not select the gender.');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Message', 'You did not select your D-O-B');
      return;
    }
    setIsLoading(true);
    create_user();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.signupView}>
          <Text style={styles.signupText}>Sign Up</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.inputTitleView}>
            <Text style={styles.inputTitleText}>Name</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Enter your full name"
              placeholderTextColor="#000000"
              maxLength={40}
              autoCapitalize="none"
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>

          <View style={styles.inputTitleView}>
            <Text style={styles.inputTitleText}>E-mail</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="tim@apple.com"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              value={email}
              autoCapitalize="none"
              onChangeText={email => setEmail(email)}
            />
          </View>

          <View style={styles.inputTitleView}>
            <Text style={styles.inputTitleText}>Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Choose a strong password"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>

          <View style={styles.inputTitleView}>
            <Text style={styles.inputTitleText}>Confirm Password</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Confirm Password"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              value={c_password}
              onChangeText={cpassword => setC_password(cpassword)}
            />
          </View>

          <View style={styles.smallInputView2}>
            <View>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Age</Text>
              </View>
              <View style={styles.smallInputView}>
                <TextInput
                  style={styles.placeholderText}
                  placeholderTextColor="#000000"
                  placeholder="Enter your age"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={age => setAge(age)}
                />
              </View>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Gender</Text>
              </View>
              <View style={styles.smallInputView}>
                <View style={styles.sexInputView}>
                  <Text>
                    <Dropdown
                      pickerStyle={{width: 100}}
                      label=""
                      data={data}
                      value={data[0].value}
                      onChangeText={value => setSex(value)}
                    />
                     
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>Height</Text>
                <Text style={styles.optionalText}> (optional)</Text>
              </View>
              <View style={styles.smallInputView}>
                <TextInput
                  style={styles.placeholderText}
                  placeholderTextColor="#000000"
                  placeholder="Enter your height"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={height => setHeight(height)}
                />
              </View>
              <View style={styles.inputTitleView}>
                <Text style={styles.inputTitleText}>D.O.B</Text>
              </View>
              <View style={styles.calendarInputView}>
                <DatePicker
                  date={date}
                  mode="date"
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate="01-01-1990"
                  maxDate={day}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 1,
                    },
                    dateInput: {
                      borderColor: '',
                      borderWidth: 0,
                    },
                  }}
                  onDateChange={date => {
                    setDate(date);
                  }}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => checkTextInput()}>
            <Text style={styles.registerText}>Create Account</Text>
          </TouchableOpacity>

          {isLoading && (
            <View>
              <ActivityIndicator size="large" color="#AA3FA6" />
            </View>
          )}

          <View style={styles.bottomTextView}>
            <Text style={styles.bottomText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
              <Text style={styles.loginBtn}>Log In</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{marginBottom: 20}}>
            <Text style={styles.bottomText2}>For signing in with GOOGLE / FACEBOOK click log in.</Text>
          </View>
           */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
