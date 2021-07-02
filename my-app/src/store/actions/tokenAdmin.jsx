import {ActionTypes} from "../actionTypes/actionTypes";


export const setTokenAdmin = (token) => {
    return {
      type: ActionTypes.SET_TOKEN,
      payload: token,
    };
  };