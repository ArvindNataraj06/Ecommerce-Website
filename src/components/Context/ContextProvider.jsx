import React from "react";

const ContextProvider = React.createContext({
  user: {},
  isFetching: false,
});

export default ContextProvider;
