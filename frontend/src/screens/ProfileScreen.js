import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  // These are coming from the ../reducers/userReducers.js
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  // These are coming from the ../reducers/userReducers.js
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // success is coming from the ../reducers/userReducers.js
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  // These are coming from the ../reducers/userReducers.js
  // Rename loading and error into loadingOrders and errorOrders in order to avoid perseveration/repetitiveness,
  // and malfunctions which will occur due to the name convention conflict.
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    // userInfo === null, if the user is not logged-in.
    if (!userInfo) {
      // If the user is not logged in, redirect him to the log-in page.
      history.push("/login");
    } else {
      // user.name comes from the userDetails.
      // If there is no user, we want to fetch one.
      // getUserDetails takes in an ID, but in this case we are passing profile. Therefore, it is going to hit
      // user's profile, not an actual user's ID, because we want to get the logged in user.
      // For more info "../actions/userActions.js", getUserDetails.
      if (!user.name) {
        // Dispatch user's details, and user's orders inside of his account.
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        // If we have everything correct, provide the requested name and email for that particular user.
        // In other words, fill in automatically update form with the current name and email.
        setName(user.name);
        setEmail(user.email);
        // Since we dont want to fill in password automatically in our update form,
        // we don't write setPassword here for security reasons.
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    // Prevent page to refresh.
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // updateUserProfile comes from the "../actions/userActions".
      // We are passing this data to "user" argument, inside of the updateUserProfile.
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* Show an error message when passwords do not match. */}
        {message && <Message variant='danger'>{message}</Message>}
        {/* If error, show error message. */}
        {error && <Message variant='danger'>{error}</Message>}
        {/* Show a success message when profile succesfully updated. */}
        {success && <Message variant='success'>Profile Updated</Message>}
        {/* If loading show spinner. */}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              // The email from the state.
              value={name}
              // setEmail to whatever we type in.
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              // The email from the state.
              value={email}
              // setEmail to whatever we type in.
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              // The password from the state.
              value={password}
              // setPassword to whatever we type in.
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              // The password from the state.
              value={confirmPassword}
              // setPassword to whatever we type in.
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {/* Only first 10 characters */}
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  {/* Only first 10 characters */}
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {/* Go to the product page */}
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
