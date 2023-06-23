export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';

export const setEmailAction = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setNameAction = (name) => ({
  type: SET_NAME,
  payload: name,
});
