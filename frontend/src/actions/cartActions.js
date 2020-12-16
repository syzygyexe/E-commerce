import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// getState allows us to get our entire state tree(productList, productDetails, cartReducer, etc) we can grab that.
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // We want to make a request to api/products/:id to get the data for that particular product do add to our cart.
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      // Comes from the parameter
      qty,
    },
  });
  // Once we dispatched everything, we want to save it in the localStorage.
  // Save it as "cartItems", and save the entire cart into it.
  // Because we can only save Strings in localStorage, and not the JavaScript object,
  // we need to convert it into JSON object.
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// dispatch to our remove reducer, getState to get all items in our cart and remove the one we want.
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
