import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// initial state with an empty array of cartItem, and an empty shippingAddress object.
export const cartReducer = (
  state = { cartItem: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // x.product is the ID of the product, item.product is the current item in the cart.
      // Basically we are setting existItem to true or false.
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            // if current item ID is equal to the existing item, then we just return the item, otherwise we return x(whatever it is).
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // If the item does not exist, add whatever in the current state to cartItems, and also add a new item.
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        // Bring all items from the state.
        ...state,
        // Filter out the one we are looking for. Show everything except for that one.
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        // Return to the initial state
        ...state,
        // action.payload is the data that we pass in the shipping form.
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        // action.payload is the data that we pass in the paymentMethod form.
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
