import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './css/myprofile';

export default function MyProfile() {
  const _userData = useSelector(state => state.userReducer.loggedInUserData);
  console.log('_userData', _userData);

  const user_email = useSelector(state => state.userReducer.user_email);
  ///console.log('user_email', user_email);

  return (
    <SafeAreaView style={{backgroundColor: '#ffff', flex: 1}}>
      <View style={styles.container}>
        <View style={styles.avatar}>
          {_userData !== null ? (
            _userData.gender === 'Female' ? (
              <Image
                style={{resizeMode: 'contain', maxHeight: 100, minWidth: 100}}
                source={require('./assets/logos/FemaleAvatar.png')}
              />
            ) : (
              <Image
                style={{resizeMode: 'contain', maxHeight: 100, minWidth: 100}}
                source={require('./assets/logos/MaleAvatar.png')}
              />
            )
          ) : (
            <Image
              style={{resizeMode: 'contain', maxHeight: 100, minWidth: 100}}
              source={require('./assets/logos/MaleAvatar.png')}
            />
          )}
        </View>
        {_userData !== null ? (
          <Text style={styles.name}>{_userData.name}</Text>
        ) : (
          <Text style={styles.name}>User</Text>
        )}
      </View>

      <View style={styles.mainView}>
        <View style={styles.rowView}>
          <View style={styles.dataView}>
            <Text style={styles.outterText}>AGE</Text>
            <View style={styles.boxView}>
              {_userData !== null ? (
                <Text style={styles.innerText}>{_userData.age}</Text>
              ) : (
                <Text style={styles.innerText}></Text>
              )}
            </View>
          </View>

          <View style={styles.dataView}>
            <Text style={styles.outterText}>D.O.B</Text>
            <View style={styles.boxView}>
              {_userData !== null ? (
                <Text style={styles.innerText}>{_userData.dob}</Text>
              ) : (
                <Text style={styles.innerText}></Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.rowView}>
          <View style={styles.dataView}>
            <Text style={styles.outterText}>HEIGHT</Text>
            <View style={styles.boxView}>
              {_userData !== null ? (
                <Text style={styles.innerText}>{_userData.height}</Text>
              ) : (
                <Text style={styles.innerText}></Text>
              )}
            </View>
          </View>

          <View style={styles.dataView}>
            <Text style={styles.outterText}>GENDER</Text>
            <View style={styles.boxView}>
              {_userData !== null ? (
                <Text style={styles.innerText}>{_userData.gender}</Text>
              ) : (
                <Text style={styles.innerText}></Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.bottomView}>
          <Text style={styles.outterText}>E-MAIL</Text>
          <View style={styles.bottomBox}>
            {_userData !== null ? (
              <Text style={styles.innerText}>{_userData.email}</Text>
            ) : (
              <Text style={styles.innerText}></Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
