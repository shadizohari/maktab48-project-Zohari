import {ActionTypes} from '../actionTypes/actionTypes';


export const setBookList = (bookList) => {
    return {
      type: ActionTypes.SET_BOOK_LIST,
      payload: bookList,
    };
  };