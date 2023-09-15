import axios from 'axios';

// Define action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Action creators
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// Async action to fetch products from the API
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    // Make an API request to fetch products
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        const products = response.data.map((product) => ({
          ...product,
          imageUrl: product.image, 
        }));
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error.message));
      });
  };
};
