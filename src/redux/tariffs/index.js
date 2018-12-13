const initialState = {
  tariffs: [],
};

const tariffsReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_TARIFFS_SUCCESS':
      return { ...state, tariffs: payload };
    default:
      return state;
  }
};

export default tariffsReducer;
