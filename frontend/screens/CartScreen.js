import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  // We need to get the id from the url with the help of match.params.id
  const productId = match.params.id;
  // We need location.search in order to get the qty(to get a "?qty=1" "?qty=2", etc)
  // .split is setting "?qty=" to [0], and everything after "=" to [1].
  // Basically we are grabbing the number after the equal sign.
  // Else qty = 1
  // It is going to give us a number, but it is not going to be Number format, therefore we add Number.
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  // Get items, and put them into our cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    // We only want to dispatch addToCart from ../actions/cartActions, if we have a productId, qty and the url
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // If the user is not logged-in, send him to the log-in page.
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {/* The cartItems which we have fetched with the help of useSelector hook */}
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {/* Looping through our cartItems which we have set with the of useSelector hook */}
            {/* All fields are coming from "../actions/cartActions" which we have fetched there
            from the database */}
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    {/* item.product is the id */}
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      // When we fire onChange, we are passing to our qty whatever is selected by e.target.value
                      onChange={(e) =>
                        // If we change the quantity, it is going to dispatch addToCart with the chosen number
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {/* Array is 0,1,2,3,4 etc, based on the product.countInStock */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        // x + 1 is because array starts from 0, we want it to start from 1.
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='dark'
                      // item.product is the id
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {/* Calculate all item in the cart. 0 is the initial value of an accumulator. */}
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.qty,
                  0
                )}
                ) items
              </h2>
              {/* Calculate all items price in the cart and bring 2 digits after the dot in the price */}
              $
              {cartItems
                .reduce(
                  (accumulator, item) => accumulator + item.qty * item.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              {/* Disable button if the cart is empty */}
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
