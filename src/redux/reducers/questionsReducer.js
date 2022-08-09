import { SAVE_QUESTIONS } from '../actions';

const initialState = {
  questions: [],
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
}

export default questionsReducer;
