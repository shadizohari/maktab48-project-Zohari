import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loadingReducer from './loadingReducer';

const RootReducer = combineReducers({

    token: tokenReducer,
    isLoading: loadingReducer,
})

export default RootReducer;