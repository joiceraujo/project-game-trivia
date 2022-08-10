import { NAME_ACTION, EMAIL_ACTION, SAVE_SCORE,
  SAVE_ASSERTIONS, RESET_GAME } from '../actions';

const initialState = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
};

function player(state = initialState, action) {
  switch (action.type) {
  case EMAIL_ACTION:
    return {
      ...state,
      email: action.payload,
    };
  case NAME_ACTION:
    return {
      ...state,
      name: action.payload,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case SAVE_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  case RESET_GAME:
    return {
      state: initialState,
    };
  default:
    return state;
  }
}

export default player;
