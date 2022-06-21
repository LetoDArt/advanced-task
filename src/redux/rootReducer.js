import { combineReducers } from 'redux';

import { navigationReducer } from './navigation/reducer';


const rootReducer = combineReducers({
  navigation: navigationReducer,
});

export default rootReducer;
