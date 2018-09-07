import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get('/api/cart')
  };
}

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: axios.post('/api/cart', product)
  };
}

const initialState = {
  cart: [],
  addToCartErrMsg: ''
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_CART}_FULFILLED`:
      return {
        ...state,
        cart: action.payload.data
      };
    case `${ADD_TO_CART}_FULFILLED`:
      return {
        ...state,
        cart: action.payload.data
      };
    case `${ADD_TO_CART}_REJECTED`:
      return {
        ...state,
        addToCartErrMsg: 'Failed To Add To Cart'
      };
    default:
      return state;
  }
}
