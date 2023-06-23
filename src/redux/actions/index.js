export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';
export const SET_SCORE = 'SET_SCORE';

export const setEmailAction = (gravatarEmail) => ({
  type: SET_EMAIL,
  payload: gravatarEmail,

});

export const setNameAction = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const setScoreAction = (score) => ({
  type: SET_SCORE,
  payload: score,
});
