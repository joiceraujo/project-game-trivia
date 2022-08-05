const initialState = {
  name: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.value,
    };
  default:
    return state;
  }
}

export default loginReducer;
