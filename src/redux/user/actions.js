import { RSAA } from 'redux-api-middleware';

export const getUserInfo = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/user`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_USER_INFO_REQUEST',
      { type: 'GET_USER_INFO_SUCCESS', meta: { spinnerKeys: { LOGIN: false } } },
      { type: 'GET_USER_INFO_FAILURE', meta: { spinnerKeys: { LOGIN: false } } },
    ]
  }
});

export const signIn = (values) => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/auth/local`,
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      { type: 'SIGN_IN_REQUEST', meta: { spinnerKeys: { LOGIN: true } } },
      'SIGN_IN_SUCCESS',
      { type: 'SIGN_IN_FAILURE', meta: { spinnerKeys: { LOGIN: false } } },
    ]
  }
});

export const signUp = (values) => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/sign-up`,
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    types: [
      { type: 'SIGN_UP_REQUEST', meta: { spinnerKeys: { LOGIN: true } } },
      'SIGN_UP_SUCCESS',
      { type: 'SIGN_UP_FAILURE', meta: { spinnerKeys: { LOGIN: false } } },
    ]
  }
});

export const logout = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/logout`,
    method: 'GET',
    credentials: 'include',
    types: [
      'LOGOUT_REQUEST',
      'LOGOUT_SUCCESS',
      'LOGOUT_FAILURE'
    ]
  }
});

export const confirmWelcome = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/confirm-welcome`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'CONFIRM_WELCOME_REQUEST',
        'CONFIRM_WELCOME_SUCCESS',
        'CONFIRM_WELCOME_FAILURE'
      ]
    }
  };
};

export const getReferrals = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/get-referrals`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_REFERRALS_REQUEST',
        'GET_REFERRALS_SUCCESS',
        'GET_REFERRALS_FAILURE'
      ]
    }
  };
};
export const unverifyUser = ({ userId }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users/${userId}/unverify`,
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'UNVERIFY_USER_REQUEST',
        'UNVERIFY_USER_SUCCESS',
        'UNVERIFY_USER_FAILURE'
      ]
    }
  };
};
export const getNotVerifiedUsers = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/users`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_NOT_VERIFIED_USERS_REQUEST',
        'GET_NOT_VERIFIED_USERS_SUCCESS',
        'GET_NOT_VERIFIED_USERS_FAILURE'
      ]
    }
  };
};
