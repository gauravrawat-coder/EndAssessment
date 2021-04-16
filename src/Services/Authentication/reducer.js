import {LOGIN_SUCCESS, SET_ID} from './constant';

const initialState = {
  loginID: null,
};

export default function Content(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {loginID: action.data.id};
    case SET_ID: {
      return {loginID: action.data};
    }

    default:
      return state;
  }
}
