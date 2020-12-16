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
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        // We want the component to know, that is currently fetching. Therefore we set, loading to true.
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        // Once its done loading, done making the request, order will be filled with that action object.
        // We are going to fill the order in the state with that payload.
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        // Here we will send the failure in the payload.
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        // Spread whatever already in the state, this will keep us from getting errors when it loads.
        ...state,
        // We want the component to know, that is currently fetching. Therefore we set, loading to true.
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        // Once its done loading, done making the request, order will be filled with that action object.
        // We are going to fill the order in the state with that payload.
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        // Here we will send the failure in the payload.
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        // We want the component to know, that is currently fetching. Therefore we set, loading to true.
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        // Once its done loading, done making the request, order will be filled with that action object.
        // We are going to fill the order in the state with that payload.
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        // Here we will send the failure in the payload.
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      // Return to an initial empty object.
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        // We want the component to know, that is currently fetching. Therefore we set, loading to true.
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        // Once its done loading, done making the request, order will be filled with that action object.
        // We are going to fill the order in the state with that payload.
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        // Here we will send the failure in the payload.
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      // Return to an initial empty object.
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        // We want the component to know, that is currently fetching. Therefore we set, loading to true.
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        // Once its done loading, done making the request, order will be filled with that action object.
        // We are going to fill the order in the state with that payload.
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        // Here we will send the failure in the payload.
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      // Reset order list when logout
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        // We want the component to know, that is currently fetching. Therefore we set, loading to true.
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        // Once its done loading, done making the request, order will be filled with that action object.
        // We are going to fill the order in the state with that payload.
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        // Here we will send the failure in the payload.
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
