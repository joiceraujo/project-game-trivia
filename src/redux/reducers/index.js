import { combineReducers } from 'redux';

import loginReducer from './user';

const reducer = combineReducers({
  user: loginReducer,
});

export default reducer;
