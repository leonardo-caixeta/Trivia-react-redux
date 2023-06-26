import {
  SET_EMAIL,
  SET_NAME,
  SET_SCORE,
  SET_ASSERTIONS,
} from '../actions/index';

// muda o nome das propriedades do estado global player,
// adequando conforme especificações do readme

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_NAME:
    return {
      ...state,
      name: action.payload,
    };

  case SET_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
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

  default:
    return state;
  }
};

export default player;
