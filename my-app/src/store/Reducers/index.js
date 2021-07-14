import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loadingReducer from './loadingReducer';
import bookListReducer from './bookListReducer';
import DeliveredStatusReucer from './DeliveredStatusReducer';

const RootReducer = combineReducers({

    token: tokenReducer,
    isLoading: loadingReducer,
    bookList: bookListReducer,
    DeliveredStatus: DeliveredStatusReucer,
})

export default RootReducer;