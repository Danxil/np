import { RSAA } from 'redux-api-middleware';

export const getTariffs = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/tariffs`,
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      'GET_TARIFFS_REQUEST',
      { type: 'GET_TARIFFS_SUCCESS' },
      { type: 'GET_TARIFFS_FAILURE' },
    ]
  }
});
