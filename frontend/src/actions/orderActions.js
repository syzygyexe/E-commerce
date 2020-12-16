import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    // Grab the user via id
    const { data } = await axios.post(
      `/api/orders`,
      // Put request to our backend, with a config which we have defined.
      // Here we are passing order object.
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      // Pass data as the payload. Data itself is the newly created order.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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

    // Grab the user via id
    const { data } = await axios.get(
      `/api/orders/${id}`,
      // Put request to our backend, with a config which we have defined.
      // Here we are passing order object.
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      // Pass data as the payload. Data itself is the newly created order.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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

    // Grab the user via id
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      // Put request to our backend, with a config which we have defined.
      // Here we are passing payment object. We do not pass the order object here,
      // because the order is already here.
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      // Pass data as the payload. Data itself is the newly created order.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
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

    // Grab the user via id
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      // Put request to our backend, with a config which we have defined.
      // We are passing an empty object, because we are not passing any data.
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      // Pass data as the payload. Data itself is the newly created order.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
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

    // Grab the user via id
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      // Pass data as the payload. Data itself is the newly created order.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
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

    // Grab the user via id
    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      // Pass data as the payload. Data itself is the newly created order.
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      // If we have an error catched by our custom error handler show it.
      // If not show an error from the catch method.
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
