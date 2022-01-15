import firestore from '@react-native-firebase/firestore';

  export const  updateFirebaseData = (obj, user_email) => {
    firestore()
      .collection('Users')
      .doc(user_email)
      .update({
        'exerciseDetails': obj,
      })
      .then(() => {
        console.log('category pushed!')
      })
  }


  