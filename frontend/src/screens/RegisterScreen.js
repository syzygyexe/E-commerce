import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  // these are coming from the ../reducers/userReducers.js
  const { loading, error, userInfo } = userRegister;

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
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    }
    // register comes from the "../actions/userActions".
    else dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {/* Show an error message when passwords do not match. */}
      {message && <Message variant='danger'>{message}</Message>}
      {/* If error, show error message. */}
      {error && <Message variant='danger'>{error}</Message>}
      {/* If loading show spinner. */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            // The email comes from the state.
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
            // The email comes from the state.
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
            // The password comes from the state.
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
            // The password comes from the state.
            value={confirmPassword}
            // setPassword to whatever we type in.
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
      {/* py === padding */}
      <Row className='py-3'>
        <Col>
          Have an Account?{" "}
          <Link
            // If we have a redirect value, redirect to whatever it is. Else, to "/login"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
