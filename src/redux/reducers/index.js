import { combineReducers } from 'redux';

import settings from './settings';
import user from './user';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({ settings, user, questionsReducer });

export default rootReducer;
