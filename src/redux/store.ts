import { configureStore } from "@reduxjs/toolkit";
import {manageDataReducer} from "./reducer";

const store = configureStore({
  reducer: {
    // You are free to call the LHS what you like, but it must have a reducer on the RHS.
    dataManage: <any>manageDataReducer,
  },
});

export default store;