import axios from "axios";
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
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

// UPD: Since this action is responsible for calling the product. We are passing a keyword to it,
// in order to make our SearchBox functioning with the back-end. Same goes for the pageNumber.
export const listProducts = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // Fetch data. ${keyword} might be a keyword, or might be an empty string.
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    // if method above works out, we get our succesful response, then we are going to dispatch this.
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      // Success scenario, we are setting our data to payload.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// We need an id to know which product are we getting
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // Fetch data.
    const { data } = await axios.get(`/api/products/${id}`);
    // if method above works out, we get our succesful response, then we are going to dispatch this.
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      // Success scenario, we are setting our data to payload with one product.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });
    // getState helps us to get userInfo which has a token in it.
    // Basically gives a logged-in user object.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Delete the product via id
    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    // getState helps us to get userInfo which has a token in it.
    // Basically gives a logged-in user object.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // We are passing an empty object because our method is POST.
    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
    // getState helps us to get userInfo which has a token in it.
    // Basically gives a logged-in user object.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // We are passing product because this is what we are going to alter with PUT method.
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });
    // getState helps us to get userInfo which has a token in it.
    // Basically gives a logged-in user object.
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // We are passing review object because this is what we are going to append with POST method.
    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    // Fetch data.
    const { data } = await axios.get("/api/products/top");
    // if method above works out, we get our succesful response, then we are going to dispatch this.
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      // Success scenario, we are setting our data to payload.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
