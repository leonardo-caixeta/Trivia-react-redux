export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';
export const SET_SCORE = 'SET_SCORE';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_TIMER_ID = 'SET_TIMER_ID';
export const SET_TIMER_REFRESH = 'SET_TIMER_REFRESH';
export const SET_TIMER_DURATION = 'SET_TIMER_DURATION';
export const SET_GAME_ANSWERED = 'SET_GAME_ANSWERED';
export const RESET_PLAYER = 'RESET_PLAYER';
export const RESET_TIMER = 'RESET_TIMER';
export const RESET_GAME = 'RESET_GAME';

export const setEmailAction = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const setNameAction = (name) => ({
  type: SET_NAME,
  payload: name,
});

export const setScoreAction = (score) => ({
  type: SET_SCORE,
  payload: score,
});

export const setAssertionsAction = (assertions) => ({
  type: SET_ASSERTIONS,
  payload: assertions,
});

export const setTimerIdAction = (id) => ({
  type: SET_TIMER_ID,
  payload: id,
});

export const setTimerRefreshAction = (refresh) => ({
  type: SET_TIMER_REFRESH,
  payload: refresh,
});

export const setTimerDurationAction = (duration) => ({
  type: SET_TIMER_DURATION,
  payload: duration,
});

export const setGameAnsweredAction = (answered) => ({
  type: SET_GAME_ANSWERED,
  payload: answered,
});

export const resetPlayerAction = () => ({
  type: RESET_PLAYER,
});

export const resetTimerAction = () => ({
  type: RESET_TIMER,
});

export const resetGameAction = () => ({
  type: RESET_GAME,
});
