import { createStore } from 'redux';
import RootReducer from './Reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export function ConfigureStore() {

    const composedEnhancers = process.env.NODE_ENV !== "production" ? composeWithDevTools : compose;
    const store = createStore(RootReducer, composedEnhancers(applyMiddleware(thunk)));

    return store;
}
