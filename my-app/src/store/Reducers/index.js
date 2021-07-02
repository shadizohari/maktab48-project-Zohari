import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const RootReducer = combineReducers({

    token: tokenReducer,
})

export default RootReducer;