import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import styles from './css/home';
import buttons from './config';
import LottieView from 'lottie-react-native';
import {AdMobBanner} from 'react-native-admob';

export default function Home({navigation}) {
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.homeBtn}
      onPress={() => {
        navigation.navigate('Exercises', {items: item});
      }}>
      <View style={styles.titleView}>
        <Text style={styles.homeBtnText}>{item.title}</Text>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.homeHeading}>Workout plans</Text>
      </View>

      <View style={styles.buttons}>
        <FlatList
          data={buttons}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10}}>
        <AdMobBanner
          adSize="smartBannerLandscape"
          adUnitID="ca-app-pub-6212540896507732/6643219491"
        />
      </View>
    </SafeAreaView>
  );
}
