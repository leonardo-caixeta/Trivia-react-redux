import {
  SET_EMAIL,
  SET_NAME,
  SET_SCORE,
  SET_ASSERTIONS,
  RESET_PLAYER,
} from '../actions/index';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  case SET_NAME:
    return {
      ...state,
      name: action.payload,
    };

  case SET_SCORE:
    return {
      ...state,
      score: action.payload,
    };

  case SET_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };

  case RESET_PLAYER:
    return {
      email: '',
      name: '',
      score: 0,
      assertions: 0,
    };

  default:
    return state;
  }
};

export default player;
