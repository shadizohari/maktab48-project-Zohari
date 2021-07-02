import {ActionTypes} from "../actionTypes/actionTypes";

const initialState = {};


function tokenReducer(state = initialState, action)
{
    switch (action.type) {
        case ActionTypes.SET_TOKEN:
            return {...state,token:action.payload};
        // case DELETE_TOKEN:
        //     return state;
        default:
            return state;
    }
}

export default  tokenReducer;