import React, { useEffect } from 'react'
import {Provider} from 'react-redux'
import { store, persistor } from './redux/store'
import RNBootSplash from "react-native-bootsplash"
import { PersistGate } from 'redux-persist/integration/react'

import NavigationHandler from './components/NavigationHandler'


export default function App() {
  
  useEffect(()=>{
      RNBootSplash.hide();
    },[])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationHandler />
      </PersistGate>
    </Provider>
  )
}