import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import styles from './css/exercises';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {updateFirebaseData} from '../Firebase/Firestore/DataBase';
import LottieView from 'lottie-react-native';
import ModalMessage from './Modal';
import {AdMobBanner} from 'react-native-admob';

export default function Exercises({route, navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('hello');
    });
    return unsubscribe;
  }, [navigation]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const {items} = route.params;
  const data = items.data;
  const title = items.title;
  let exBtn = false;
  let filterIndex;

  const history_data = useSelector(state => state.appReducer.history);
  const user_email = useSelector(state => state.userReducer.user_email);

  const f_category = history_data.filter((data, index) => {
    if (data.title === title && data.done !== true) {
      filterIndex = index;
      return true;
    }
  });
  console.log('f_category', f_category);
  console.log('f_category.length', f_category.length);

  if (f_category.length === 1) {
    const cat = f_category.pop();
    console.log('pop', cat);
    exBtn = cat.exBtn;
    console.log('button', exBtn);
  }

  const removeCategory = () => {
    history_data.splice(filterIndex, 1);
    updateFirebaseData(history_data, user_email);
    setIsModalVisible(false);
    navigation.navigate('StartExercises', {items: items});
  };
  const resumeExercise = () => {
    setIsModalVisible(false);
    navigation.navigate('StartExercises', {items: items});
  };

  const renderItem = ({item}) => (
    <View>
      <View style={styles.exerciseImgView}>
        <View style={styles.exTitleView}>
          <Text style={styles.exerciseText}>{item.name}</Text>
        </View>

        {/* <View style={styles.triangle}/>  */}
        <View style={{maxWidth: 250, maxHeight: 100}}>
          <LottieView
            style={{width: '100%', height: '100%'}}
            source={item.src}
            autoPlay={true}
            loop={true}
          />
        </View>
      </View>

      <Text style={styles.insHeading}>Instructions</Text>
      <View style={styles.insView}>
        <Text style={styles.insText}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}>
        <Icon name="arrow-long-left" color="#ffffff" size={20} />
      </TouchableOpacity>

      <View style={styles.exerciseView}>
        <View style={styles.startBtnView}>
          <Text style={styles.heading}>{items.title}</Text>
          {exBtn === true ? (
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={styles.startBtn}>
              <Text style={styles.startBtnText}>Resume Exercise</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StartExercises', {items: items})
              }
              style={styles.startBtn}>
              <Text style={styles.startBtnText}>Start Exercise</Text>
            </TouchableOpacity>
          )}
        </View>

        <ModalMessage
          isModalVisible={isModalVisible}
          CloseModal={() => setIsModalVisible(false)}
          msg={'What do you want to?'}
          btn1={'Start Over'}
          btn2={'Resume'}
          function1={removeCategory}
          function2={resumeExercise}
        />

        <View style={styles.buttons}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{bottom: 5}}>
          <AdMobBanner
            adSize="smartBannerLandscape"
            adUnitID="ca-app-pub-6212540896507732/6643219491"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
