import { createStore } from "redux";

export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_COG_USERID = "SET_COG_USERID";
export const SET_ALL_ORDERS = "SET_ALL_ORDERS";

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload
      };
    case SET_COG_USERID:
      return {
        ...state,
        cogUsername: action.payload
      };
    case SET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload
      };
    default:
      return { ...state };
  }
}

export const getUserType = (state) => state.userType;
export const getCogUsername = (state) => state.cogUsername;
export const getAllOrders = (state) => state.allOrders;

export default createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
