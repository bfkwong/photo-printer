import { createStore } from "redux";

export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_COG_USERID = "SET_COG_USERID";
export const SET_ALL_ORDERS = "SET_ALL_ORDERS";
export const SET_COMPLETED_FTU = "SET_COMPLETED_FTU";
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_ALL_USERS = "SET_ALL_USERS";

const initialState = {
  userType: null
};

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
    case SET_COMPLETED_FTU:
      return {
        ...state,
        completedFTU: action.payload
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    default:
      return { ...state };
  }
}

export const getUserType = (state) => state.userType;
export const getCogUsername = (state) => state.cogUsername;
export const getAllOrders = (state) => state.allOrders;
export const getCompletedFTU = (state) => state.completedFTU;
export const getUserInfo = (state) => state.userInfo;
export const getAllUsers = (state) => state.allUsers ?? [];

export default createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
