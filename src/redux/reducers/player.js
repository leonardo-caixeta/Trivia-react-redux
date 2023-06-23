import { SET_EMAIL, SET_NAME, SET_SCORE } from '../actions/index';

// muda o nome das propriedades do estado global player, adequando conforme especificações do readme
const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
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

  default:
    return state;
  }
};

export default player;
