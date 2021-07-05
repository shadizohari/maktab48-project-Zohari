import { ActionTypes } from "../actionTypes/actionTypes";

const initialState = false;


function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return { ...state, isLoading: state };
    }
}

export default loadingReducer;