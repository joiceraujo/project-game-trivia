const initialState = {
  email: '',
  name: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'EMAIL_ACTION':
    return {
      ...state,
      email: action.payload,
    };
  case 'NAME_ACTION':
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
}

export default user;
