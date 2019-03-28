import { RSAA } from 'redux-api-middleware';

export const createSupportTicket = ({ email, text, subject }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/support`,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, subject, email }),
      types: [
        'CREATE_SUPPORT_TICKET_REQUEST',
        'CREATE_SUPPORT_TICKET_SUCCESS',
        'CREATE_SUPPORT_TICKET_FAILURE'
      ]
    }
  };
};
