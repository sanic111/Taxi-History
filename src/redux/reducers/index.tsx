// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import mainReducer from "./main";

// Redux: Root Reducer

export type ControllerReducerType = {
  main: MainReducerType;
};

export type MainReducerType = {};

const rootReducer = {
  main: mainReducer,
};

// Exports
export default rootReducer;
