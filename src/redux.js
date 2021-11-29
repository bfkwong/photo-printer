import { createStore } from "redux";

const SET_USER_TYPE = "SET_USER_TYPE";

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload
      };
    default:
      return { ...state };
  }
}

export const getUserType = (state) => state.userType;

export default createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
