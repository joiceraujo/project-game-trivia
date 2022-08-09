import { combineReducers } from 'redux';

import settings from './settings';
import player from './player';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({ settings, player, questionsReducer });

export default rootReducer;
