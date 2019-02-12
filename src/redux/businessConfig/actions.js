import { RSAA } from 'redux-api-middleware';

export const getBusinessConfig = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/business-config`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_BUSINESS_CONFIG_REQUEST',
        'GET_BUSINESS_CONFIG_SUCCESS',
        'GET_BUSINESS_CONFIG_FAILURE'
      ]
    }
  };
};
