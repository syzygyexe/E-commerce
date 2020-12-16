import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  // Get everything from the getOrderDetails from "../actions/orderActions"
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  // Rename loading to loadingPay, rename success to successPay.
  // Merely because we already have loading and error inside of the orderDetails.
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  // Rename loading to loadingDeliver, rename success to successDeliver.
  // Merely because we already have loading and error inside of the orderDetails.
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  // Giving us a logged-in user.
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    // Calculate prices once the loading is done.
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      )
    );
  }

  // Fetch PayPal API script.
  useEffect(() => {
    // If user is not logged-in, redirect him to the log-in page.
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      // clientId is the id which we have copied from our PayPal Sandbox into .env file.
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      // src is taken from the PayPal sandbox, clientId is taken from PayPal sandbox personal account.
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      // Once the script is loaded, setSdkReady to true.
      script.onload = () => {
        setSdkReady(true);
      };
      // Add the script to the body
      document.body.appendChild(script);
    };

    // Dispatch order details when we first came to the page(!order)(If there is no paid order yet).
    // Also, dispatch order details after the successful payment.
    if (!order || successPay || successDeliver) {
      // Reset order status in order to avoid infinity page refresh loop.
      dispatch({ type: ORDER_PAY_RESET });
      // Reset deliver status in order to avoid infinity page refresh loop.
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
      // Add PayPal script for unpdaid orders.
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver, userInfo, history]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // paymentResult is being taken from PayPal API.
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    // Once we pay, update the database's !successPay into successPay(from false to true).
    // This will trigger getOrderDetails once again, and change the status to paid.
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1 className='order-text'>Order {order._id}</h1>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto: ${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {/* Deliver status */}
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {/* Payment status */}
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          {/* In the state of cartItems we have the name, the image, etc */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Render a PayPal button for unpaid orders. */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {/* If loadingPay(renamed loading) is true, show <Loader /> */}
                  {loadingPay && <Loader />}
                  {/* Show loader if SDK is not ready */}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    // In other case display PayPalButton
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {/* If current user is logged-in, and current user is Admin, and selected order is paid, 
              and not delivered yet, display a button which can change the order status to delivered. */}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
