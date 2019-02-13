const initialState = {
  list: [],
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_INVESTMENTS_REQUEST':
      return initialState;
    case 'GET_INVESTMENTS_SUCCESS':
      return { ...state, list: payload };
    case 'CREATE_INVESTMENTS_SUCCESS':
      return { ...state, list: [...state.list, { ...payload }] };
    default:
      return state;
  }
};

export default reducer;
