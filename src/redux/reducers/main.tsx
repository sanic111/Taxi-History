import { MainReducerType } from ".";
import * as types from "../types";
import api from "../../network/API";

const initialState = {
  recentCourse: [],
};

export default function mainReducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    default:
      return state;
  }
}
