import { RSAA } from 'redux-api-middleware';

export const getInvestments = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/investments`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_INVESTMENTS_REQUEST',
        'GET_INVESTMENTS_SUCCESS',
        'GET_INVESTMENTS_FAILURE'
      ]
    }
  };
};

export const createInvestment = ({ amount, tariffId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/investments`,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, tariffId }),
      types: [
        'CREATE_INVESTMENT_REQUEST',
        'CREATE_INVESTMENT_SUCCESS',
        'CREATE_INVESTMENT_FAILURE'
      ]
    }
  };
};
