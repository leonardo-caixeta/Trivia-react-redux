import {
  SET_TIMER_ID,
  SET_TIMER_REFRESH,
  SET_TIMER_DURATION,
  SET_GAME_ANSWERED,
  RESET_TIMER,
  RESET_GAME,
} from '../actions/index';

const INITIAL_STATE = {
  timerId: null,
  timerRefresh: false,
  timerDuration: 0,
  gameAnswered: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIMER_ID:
    return {
      ...state,
      timerId: action.payload,
    };

  case SET_TIMER_REFRESH:
    return {
      ...state,
      timerRefresh: action.payload,
    };

  case SET_TIMER_DURATION:
    return {
      ...state,
      timerDuration: action.payload,
    };

  case SET_GAME_ANSWERED:
    return {
      ...state,
      gameAnswered: action.payload,
    };

  case RESET_TIMER:
    return {
      timerId: null,
      timerRefresh: false,
      timerDuration: 0,
    };

  case RESET_GAME:
    return {
      timerId: null,
      timerRefresh: false,
      timerDuration: 0,
      gameAnswered: false,
    };

  default:
    return state;
  }
};

export default game;
