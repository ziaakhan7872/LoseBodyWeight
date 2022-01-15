import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {historyData} from '../redux/action';
import Icon from 'react-native-vector-icons/Entypo';
import {ProgressBar} from 'react-native-paper';
import styles from './css/startexercise';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Toast from 'react-native-simple-toast';
import {updateFirebaseData} from '../Firebase/Firestore/DataBase';
import LottieView from 'lottie-react-native';
import ModalMessage from './Modal';
import {AdMobInterstitial} from 'react-native-admob';

export default function StartExercises({route, navigation}) {
  const dispatch = useDispatch();
  const history_data = useSelector(state => state.appReducer.history);
  const user_email = useSelector(state => state.userReducer.user_email);

  const {items} = route.params;
  const data = items.data;

  const title = items.title;
  let filteredIndex = null;

  const repsArr = new Array(data.length).fill(0);
  const fillArr = new Array(data.length).fill(0);
  const [reps, setReps] = useState(repsArr);
  const [fill, setFill] = useState(fillArr);
  const [avg, setAvg] = useState(0);
  const [test, setTest] = useState('');
  const [value, setValue] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredHis = history_data.filter((data, index) => {
    if (title === data.title && data.done !== true) {
      filteredIndex = index;

      return true;
    }
  });

  useEffect(() => {
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-6212540896507732/8153125173');

    AdMobInterstitial.requestAd().catch(error => console.log('Hi', error));
    AdMobInterstitial.removeAllListeners();

    AdMobInterstitial.showAd().catch(error => console.log('Hello', error));
  }, []);

  useEffect(() => {
    if (filteredHis.length !== 0) {
      console.log('length is not zero');
      if (history_data[filteredIndex].done !== true) {
        console.log('get data from redux');
        const reduxRepsData = data.map(exData => {
          return extractExerciseReps(exData.name);
        });
        console.log('redux reps', reduxRepsData);

        const repsTofill = reduxRepsData.map(number => {
          return parseInt(number) * 10;
        });

        console.log('redux fill', repsTofill);

        setFill(repsTofill);
        setReps(reduxRepsData);

        const reduxAvg = extractExerciseAvg();
        setAvg(reduxAvg);
      }
    }

    BackHandler.addEventListener('hardwareBackPress', backClickHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backClickHandler);
    };
  }, [test]);

  const exDoneDate = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let UpdateDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min;

    return UpdateDate;
  };

  const updateDataInRedux = (item, flIndex, newArr, progressAvg) => {
    let ex_index;
    let cat_index;
    let c_Date = exDoneDate();
    let id = Math.floor(Math.random() * 10000) + 1;
    const name = item.name;
    let done;

    const f_category = history_data.filter((data, index) => {
      if (title === data.title) {
        cat_index = index;
        done = data.done;

        return true;
      }
    });
    if (f_category.length !== 0 && done === false) {
      const cat = f_category.pop();

      if (cat) {
        const f_exercise = cat.exercises.filter((data, index) => {
          if (name === data.exName) {
            ex_index = index;
            return true;
          }
        });
        if (f_exercise.length !== 0) {
          const ex = f_exercise.pop();
          if (ex) {
            history_data[cat_index].exercises[ex_index].reps = newArr[flIndex];
            history_data[cat_index].avg = progressAvg;
            updateFirebaseData(history_data, user_email);
          }
        } else {
          history_data[cat_index].exercises.push({
            exName: name,
            reps: newArr[flIndex],
          });
          history_data[cat_index].avg = progressAvg;
          updateFirebaseData(history_data, user_email);
        }
      }
    } else {
      history_data.push({
        date: c_Date,
        id: id,
        title: title,
        avg: progressAvg,
        exBtn: true,
        done: false,
        exercises: [{exName: name, reps: newArr[flIndex]}],
      });
      updateFirebaseData(history_data, user_email);
      dispatch(historyData(history_data));
    }
  };
  //TODO: check
  const updateReps = (value, index, item) => {
    console.log(`...reps=======>`, ...reps);
    const newArr = [...reps];

    if (isNaN(parseInt(value))) {
      newArr[index] = '0';
    } else if (value >= 0 && value <= 10) {
      newArr[index] = value;

      const newArr2 = [...fill];

      if (isNaN(parseInt(value))) {
        newArr2[index] = 0;
      } else {
        newArr2[index] = parseInt(value * 10);
      }

      setReps(newArr);
      setFill(newArr2);

      const arrToInt = newArr.map(number => {
        return parseInt(number);
      });
      const sum = arrToInt.reduce((a, b) => a + b, 0);
      const progressAvg = sum / (data.length * 10);
      setAvg(progressAvg);

      updateDataInRedux(item, index, newArr, progressAvg);
    } else {
      newArr[index] = '';
      setReps(newArr);

      Alert.alert('Warning!', 'please enter a valid number between 0 and 10', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const extractExerciseReps = exName => {
    const ex = history_data.filter(data => {
      if (data.title === title) {
        return true;
      }
    });
    const popEx = ex.pop();
    if (popEx) {
      const extractReps = popEx.exercises.filter(data => {
        if (data.exName === exName) {
          return true;
        }
      });
      const popReps = extractReps.pop();
      if (popReps) return popReps.reps + '';
    }
    return '0';
  };

  const extractExerciseAvg = () => {
    const ex = history_data.filter(data => {
      if (data.title === title) {
        return true;
      }
    });
    const popEx = ex.pop();

    if (popEx) {
      return popEx.avg;
    }
    return 0;
  };

  const backClickHandler = () => {
    const isAnyNonZero = reps.some(element => element !== '0');

    if (isAnyNonZero) {
      Toast.show('Data has been saved!');
      navigation.reset({
        index: 0,
        routes: [{name: 'MenuDrawer'}],
      });
    } else
      navigation.reset({
        index: 0,
        routes: [{name: 'MenuDrawer'}],
      });
    return true;
  };

  const doneBtnPressed = () => {
    history_data[filteredIndex].exBtn = false;
    history_data[filteredIndex].done = true;
    updateFirebaseData(history_data, user_email);
    navigation.reset({
      index: 0,
      routes: [{name: 'MenuDrawer'}],
    });
  };

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.exerciseImgView}>
        <View style={styles.exTitleView}>
          <Text style={styles.exerciseText}>{item.name}</Text>
        </View>

        <View>
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
      </View>
      {/* TODO:  change TextInput value*/}
      <View style={styles.repsView}>
        <Text style={styles.progressheadingText}>Reps</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.placeholderText}
            placeholder="0"
            keyboardType="numeric"
            value={reps[index]}
            // maxLength={2}
            onChangeText={value => updateReps(value, index, item)}
          />
          <Text>/10</Text>
        </View>
        <Text style={styles.progressheadingText}>Completion</Text>
        {reps[index] !== null || isNaN(!reps[index]) ? (
          <AnimatedCircularProgress
            size={50}
            width={3}
            fill={fill[index]}
            tintColor="#AA3FA6"
            backgroundColor="#ECECEC">
            {fill => <Text>{fill.toFixed(0)}%</Text>}
          </AnimatedCircularProgress>
        ) : (
          <AnimatedCircularProgress
            size={50}
            width={3}
            fill={0}
            tintColor="#AA3FA6"
            backgroundColor="#ECECEC">
            {fill => <Text>{fill}%</Text>}
          </AnimatedCircularProgress>
        )}
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => backClickHandler()}
        style={styles.backIcon}>
        <Icon name="arrow-long-left" color="#ffffff" size={20} />
      </TouchableOpacity>

      <View style={styles.progressheadingView}>
        <Text style={styles.progressheadingText}>Overall Progress</Text>
        <View style={{paddingTop: 5}}>
          {avg == 1 ? (
            <ProgressBar progress={avg} color={'#440164'} style={styles.pBar} />
          ) : null}
        </View>
      </View>

      <View style={styles.buttons}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {reps.every(currentValue => currentValue !== '0') &&
      reps.every(currentValue => currentValue !== '') ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setIsModalVisible(true)}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}

      <ModalMessage
        isModalVisible={isModalVisible}
        CloseModal={() => setIsModalVisible(false)}
        msg={'Exercise completed!'}
        btn1={null}
        btn2={'Ok'}
        function1={null}
        function2={doneBtnPressed}
      />
    </SafeAreaView>
  );
}
