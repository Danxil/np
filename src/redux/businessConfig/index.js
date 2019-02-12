const reducer = (state = null, { type, payload }) => {
  switch (type) {
    case 'GET_BUSINESS_CONFIG_SUCCESS':
      return { ...payload };
    default:
      return state;
  }
};

export default reducer;
