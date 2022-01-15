import React,{ useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import PushNotification, { Importance } from "react-native-push-notification";
import { DrawerContentScrollView } from '@react-navigation/drawer';
import styles from './css/customdrawer'
import { useSelector, useDispatch } from 'react-redux';
import { clearHistory, reminder } from '../redux/action'
import { isLoggedin, populateUserData } from '../redux/userActions';
import LinearGradient from 'react-native-linear-gradient';

export default function CustomDrawer(props) {
    
    const dispatch = useDispatch()
    const isReminderOn = useSelector(state => state.appReducer.isReminderOn)
    const [isSwitchOn, setIsSwitchOn] = useState(isReminderOn);

    useEffect(() => {    
        checkReminderOn()
    }, [isSwitchOn])

    const checkReminderOn = () => {
        console.log('switch is', isSwitchOn)
        dispatch(reminder(isSwitchOn))   
    }

    
    const onToggleSwitch = () => { 
        setIsSwitchOn(!isSwitchOn)
    }
    
    const sendNotification = () => {
        
        PushNotification.createChannel(
            {
                channelId: "channel-id", 
                channelName: "My channel",
                channelDescription: "A channel to categorise your notifications", 
                playSound: true, 
                soundName: "default", 
                importance: Importance.HIGH, 
                vibrate: true, 
            },
            (created) => console.log(`createChannel returned---> '${created}'`)
            );
            
            PushNotification.localNotificationSchedule({
                id: 111,
                channelId: "channel-id", 
                title: "Loose Body Weight",
                message: "It's time to complete your daily exercise.", 
                date: new Date(Date.now() + (60 * 60 * 24 * 1000)), 
                allowWhileIdle: true, 
                repeatType: 'day'
            },
            console.log('notification on your app')
            );
        }
        
        if(isReminderOn === true){
            console.log('notification sent', isReminderOn)
            sendNotification()
        }  
        if (isReminderOn === false){
            console.log('notifications cancled', isReminderOn)
            PushNotification.cancelLocalNotifications({id: '111'})
        }

    return(
        <LinearGradient colors={['rgba(108, 22, 74, 0.3038)', 'rgba(0, 60, 94, 0.3871)']} style={{flex:1}}>

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <Drawer.Section style={styles.drawerSection}>
                        
                        <TouchableOpacity 
                            style={styles.compView}
                            onPress={() => {
                                props.navigation.reset({
                                index: 0,
                                routes: [{name: 'MenuDrawer'}],
                              })
                            }}
                        >
                            <Text style={styles.compText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.compView}
                            onPress={() => {props.navigation.navigate('MyProfile')}}
                        >
                            <Text style={styles.compText}>My Profile</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.compView}
                            onPress={() => {props.navigation.navigate('History')}}
                        >
                            <Text style={styles.compText}>History</Text>
                        </TouchableOpacity>
                        
                        <TouchableRipple >
                            <View style={styles.reminderView}>
                                <View>
                                <Text style={styles.compText}>Reminder</Text>
                                <Text style={styles.caption}>Turn on remainder for daily updates</Text>
                                </View>
                                <View>
                                    <Switch
                                        trackColor={{ false: "#ffffff", true: "rgba(108, 22, 74, 0.62)" }}
                                        thumbColor={"rgba(108, 22, 74, 0.62)"}
                                        value={isReminderOn} onValueChange={onToggleSwitch}
                                    />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>

            </DrawerContentScrollView>

            <Drawer.Section >
                <TouchableOpacity style={styles.compView}
                    onPress={()=> {
                        dispatch(isLoggedin(false)), 
                        dispatch(clearHistory())
                        dispatch(populateUserData(null))
                        props.navigation.reset({
                            index: 0,
                            routes: [{name: 'LogIn'}],
                        })
                    }}
                >
                    <Text style={styles.compText}>Log Out</Text>
                </TouchableOpacity>
            </Drawer.Section>
            
        </LinearGradient>
    );
}