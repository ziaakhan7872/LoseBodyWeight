import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import appReducer from "./reducer";
import userReducer from './userReducer'

const persistConfig = {
    key: 'store',
    storage: AsyncStorage,
    whitelist: ['appReducer', 'userReducer']
}

const rootReducer = combineReducers({
  appReducer: appReducer,
  userReducer: userReducer
});

export default persistReducer(persistConfig, rootReducer) 
