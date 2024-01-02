import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserReducer";
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const rootReducer = combineReducers({
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware.withExtraArgument({ axios })],
});

export default store;