import {combineReducers} from 'redux';
import {userReducer} from './user';
import {globalReducer} from './global';

const reducer = combineReducers({
  userReducer,
  globalReducer,
});

export default reducer;
