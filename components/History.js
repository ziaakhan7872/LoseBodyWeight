import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView} from 'react-native'
import { useSelector } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './css/history'

export default function History({navigation}) {
    const [test, settest] = useState('')
    useEffect(()=> {
        const unsubscribe = navigation.addListener('focus', () => {
          console.log("hello")
          settest('hello')
        });
      
        return unsubscribe;
      }, [navigation]);

    const history = useSelector((state) => state.appReducer.history)
    console.log('history', history)

    const renderSubItem = ({item}) => (
        <View style={styles.subView}>
            <Text style={styles.exName} numberOfLines={1} ellipsizeMode='tail' >{item.exName}</Text>
            <View style={styles.repsView}>
                <Text style={styles.repsText}>{item.reps} /10</Text>
            </View>
        </View>
    )

    const renderItem = ({ item }) => (
        <View>

            <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.title}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={{justifyContent:'center', alignItems:'center', marginBottom:20}}>

                <View style={styles.mainView}>
                    
                    <View style={{justifyContent:'space-between',}}>

                    <FlatList
                        numColumns={3}
                        data={item.exercises}
                        renderItem={renderSubItem}
                        keyExtractor={index => index}
                    />

                    </View>
                    
                    <View style={styles.progressView}>
                    <AnimatedCircularProgress
                            size={50}
                            width={3}
                            fill={parseInt(item.avg*100)}
                            tintColor="#AA3FA6"
                            backgroundColor="#ECECEC">
                            {
                                (fill) => (
                                <Text>
                                    {fill.toFixed(0)}%
                                </Text>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>

                </View>
                {
                    item.done === true ?
                    <View style={{width:'90%'}}>
                        <Text style={{color:"#AA3FA6", alignSelf:'flex-start'}}>Completed</Text>
                    </View>:
                    <View style={{width:'90%'}}>
                        <Text style={{color:"#AA3FA6", alignSelf:'flex-start'}}>In progress</Text>
                    </View>
                }
            </View>
  
        </View>
      );

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#ffff'}}>

            <View style={styles.container}> 
                <Text style={styles.historyHeading}>History</Text>
            </View>            
            {history !== null ?
                <View style={{flex:1}}>
                    <FlatList
                        data={history}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>:
                <View/>
            }

        </SafeAreaView>
    )
}
