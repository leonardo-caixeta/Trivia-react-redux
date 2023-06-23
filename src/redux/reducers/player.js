import { SET_EMAIL, SET_NAME } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  name: '',
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

  default:
    return state;
  }
};

export default player;
