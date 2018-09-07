import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts() {
  return {
    type: GET_PRODUCTS,
    payload: axios.get('/api/products')
  };
}

const initialState = {
  products: [],
  isLoading: false,
  productErrMessage: ''
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productErrMessage: 'Failed To Use Middlewares'
      };
    case `${GET_PRODUCTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PRODUCTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        products: action.payload.data
      };
    case `${GET_PRODUCTS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        productErrMessage: 'Failed To Fetch Products'
      };
    default:
      return state;
  }
}
