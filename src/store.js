import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import productReducer from './ducks/productReducer';
import userReducer from './ducks/userReducer';
import cartReducer from './ducks/cartReducer';

const combinedReducers = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

const store = createStore(combinedReducers, middlewares);

export default store;
