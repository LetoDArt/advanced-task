import { combineReducers } from 'redux';

import { navigationReducer } from './navigation/reducer';
import { tableReducer } from './tables/reducer';


const rootReducer = combineReducers({
  navigation: navigationReducer,
  table: tableReducer,
});

export default rootReducer;
