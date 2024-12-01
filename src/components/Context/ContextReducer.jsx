import React, { useReducer } from "react";
import ContextProvider from "./ContextProvider";

const defaulState = {
  user: JSON.parse(localStorage.getItem("NeelUsername")) || null,
  isFetching: false,
};

const reducer = (state, action) => {
  // console.log(state);
  // console.log(action.cart);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        isFetching: action.isFetching,
      };

    case "LOGIN_START":
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};

const ContextReducer = (props) => {
  return (
    <ContextProvider.Provider value={useReducer(reducer, defaulState)}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default ContextReducer;
