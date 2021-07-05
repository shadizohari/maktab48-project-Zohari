import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loadingReducer from './loadingReducer';
import bookListReducer from './bookListReducer';

const RootReducer = combineReducers({

    token: tokenReducer,
    isLoading: loadingReducer,
    bookList: bookListReducer,
})

export default RootReducer;