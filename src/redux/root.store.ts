// @ts-nocheck
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {rootReducer} from './root.reducer';

let composeEnhancers = compose;

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

// if (__DEV__) {
//   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// }

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk)),
// );

export default store;
