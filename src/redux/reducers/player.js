import { NAME_ACTION, EMAIL_ACTION, SAVE_SCORE } from '../actions';

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
  default:
    return state;
  }
}

export default player;
