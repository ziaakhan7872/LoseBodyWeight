import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '735712241463-bctunho9dcjiqj5alrsovhbib0vh5eo0.apps.googleusercontent.com',
});

export const createAccount = (email, password) => {
  console.log('creact account function called.');
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      return true;
    })
    .catch(error => {
      throw error.code;
    });
};

export const loggedIn = (email, password) => {
  console.log('logged in function called.');
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return true;
    })
    .catch(error => {
      throw error.code;
    });
};

export async function onGoogleButtonPress() {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
}

export async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions([
    'email',
    'public_profile',
    'user_friends',
  ]);
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  const data = await AccessToken.getCurrentAccessToken();
  console.log(`data.accessToken`, data.accessToken);
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  return auth().signInWithCredential(facebookCredential);
}

export const storeUserInFireBase = ({
  name,
  email,
  age,
  height,
  gender,
  dob,
  exerciseDetails,
}) => {
  console.log('firebase function called');
  firestore()
    .collection('Users')
    .doc(email)
    .set({
      name: name,
      height: height,
      age: age,
      email: email,
      dob: dob,
      gender: gender,
      exerciseDetails: exerciseDetails,
    })
    .then(() => {
      console.log('User added!');
    });
};

export const getUser = async email => {
  console.log('getUser from firebase============>', email);
  let data = await firestore()
    .collection('Users')
    .doc(email)
    .get()
    .then(documentSnapshot => {
      console.log('User exists: ', documentSnapshot.exists);
      if (documentSnapshot.exists) {
        console.log('User data: ', documentSnapshot.data());
        return documentSnapshot.data();
      }
    });
  console.log('data from firebase', data);
  return data;
};

// export const getUser = async user_email => {
//   console.log('getUser from firebase============>', user_email);
//   let data = firestore()
//     .collection('Users')
//     .get()
//     .then(querySnapshot => {
//       console.log('Total users: ', querySnapshot.size);

//       querySnapshot.forEach(documentSnapshot => {
//         console.log('User ID: ', documentSnapshot, documentSnapshot.data());
//       });
//     });
//   return data;
// };
