import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from "react-redux"

import LogIn from './LogIn'
import Register from './Register' 
import Exercises from './Exercises'
import StartExercises from './StartExercises'
import MenuDrawer from './MenuDrawer'
import ForgotPassword from './ForgotPassword'

const Stack = createStackNavigator()

export default function NavigationHandler() {

    const is_logged_in =  useSelector(state=> state.userReducer.is_logged_in)
    return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
              {
                  is_logged_in === true ?
                  <>
                  <Stack.Screen name="MenuDrawer" component={MenuDrawer} /> 
                  <Stack.Screen name="Exercises" component={Exercises} /> 
                  <Stack.Screen name="StartExercises" component={StartExercises} /> 
                  <Stack.Screen name="LogIn" component={LogIn} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                  <Stack.Screen name="Register" component={Register} />
                  </> :
                  <>
                  <Stack.Screen name="LogIn" component={LogIn} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="MenuDrawer" component={MenuDrawer} /> 
                  <Stack.Screen name="Exercises" component={Exercises} /> 
                  <Stack.Screen name="StartExercises" component={StartExercises} /> 
                  </>   
              }

          </Stack.Navigator >
        </NavigationContainer>
    )
}