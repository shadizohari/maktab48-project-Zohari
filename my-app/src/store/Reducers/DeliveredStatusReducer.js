import { ActionTypes } from "../actionTypes/actionTypes";

const initialState = "enroute";


function DeliveredStatusReucer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_DELEVERED_STATUS:
            return  action.payload ;
        default:
            return state;
    }
}

export default DeliveredStatusReucer;