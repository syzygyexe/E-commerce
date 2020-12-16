import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      // Once its done loading, done making the request, products will be filled with that action object.
      // We are going to fill the products in the state with that payload. Same goes for pages and page.
      // products, pages and page are coming from the backend/productController >>> res.json({ ... })
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  // product is an object with different variables and one "reviews" array.
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      // Make a request for whatever is in the state variable
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      // Once its done loading, done making the request, product will be filled with that action object. We are going to fill the product in the state with that payload.
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  // product is an object with different variables and one "reviews" array.
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      // Once its done loading, done making the request, success is going to be set to true.
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (
  // product is an object with different variables and one "reviews" array.
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      // Once its done loading, done making the request, success is going to be set to true, and product is going to be filled with that payload action.
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  // product is an object with different variables and one "reviews" array.
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      // Once its done loading, done making the request, success is going to be set to true,
      // product is going to be filled with that payload action.
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      // Once its done loading, done making the request, success is going to be set to true.
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// Array of top products.
export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      // We want the component to know, that is currently fetching. Therefore we set, loading to true.
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      // Once its done loading, done making the request, success is going to be set to true.
      // Initial empty array of products is being filled with the action.payload.
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      // Here we will send the failure in the payload.
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
