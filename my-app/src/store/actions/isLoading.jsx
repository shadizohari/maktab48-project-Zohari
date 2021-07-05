import {ActionTypes} from '../actionTypes/actionTypes';


export const setLoading = (isLoading) => {
    return {
      type: ActionTypes.SET_LOADING,
      payload: isLoading,
    };
  };