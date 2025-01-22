import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/CustomerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

/*
import {createStore, combineReducers, applyMiddleware } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/CustomerSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store*/
