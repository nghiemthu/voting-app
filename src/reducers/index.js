import { combineReducers } from 'redux';
import polls from './polls';
import user from './user';
import alerts from './alert';

const rootReducer = combineReducers({
  polls,
  user,
  alerts,
});

export default rootReducer;