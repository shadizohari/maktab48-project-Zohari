import { ActionTypes } from "../actionTypes/actionTypes";

const initialState = [];


function bookListReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_BOOK_LIST:
            return { ...state, bookList: action.payload };
        default:
            return state;
    }
}

export default bookListReducer;