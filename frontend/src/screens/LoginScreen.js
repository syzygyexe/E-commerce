import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  // these comes from the ../reducers/userReducers.js
  const { loading, error, userInfo } = userLogin;

  // Search for a url query string(The one which goes after "?##=##" sign).
  // If that exist, split by the "=". Everything what goes after the "=" sign will be [1].
  // If that does not exist, redirect to "/".
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // userInfo === null, if the user is not logged-in.
    if (userInfo) {
      // If the user is logged-in, redirect him to a needed page.
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    // Prevent page to refresh.
    e.preventDefault();
    // login comes from the "../actions/userActions".
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* If error, show error message */}
      {error && <Message variant='danger'>{error}</Message>}
      {/* If loading show spinner */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      {/* py === padding */}
      <Row className='py-3'>
        <Col>
          New Customer?{" "}
          <Link
            // If we have a redirect value, redirect to whatever it is. Else, to "/register"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
