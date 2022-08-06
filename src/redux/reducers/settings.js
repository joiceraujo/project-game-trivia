const initialState = {
  name: '',
};

function settings(state = initialState, action) {
  switch (action.type) {
  case 'SETTINGS':
    return {
      ...state,
      name: action.value,
    };
  default:
    return state;
  }
}

export default settings;
