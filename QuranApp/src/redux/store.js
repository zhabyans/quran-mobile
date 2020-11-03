import { createStore } from 'redux';
import iniReducer from './reducer'

const store = createStore(iniReducer)

export default store