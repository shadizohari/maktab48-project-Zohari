import {ActionTypes} from '../actionTypes/actionTypes';


export const setDeliveredStatus = (status) => {
    return {
      type: ActionTypes.SET_DELEVERED_STATUS,
      payload: status,
    };
  };