import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  // Now we can use shippingAddress.address, shippingAddress.city, etc.
  const { shippingAddress } = cart;

  // If shippingAddress is in the localStorage, it is going to bring an initial state for our useState hooks.
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    // Prevent page from refreshing
    e.preventDefault();
    // Shipping form data.
    // For more info go to "../actions/cartActions"
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // After dispatching everything, move user to the next page.
    history.push("/payment");
  };

  return (
    <FormContainer>
      {/* step1 === login link, step2 === shipping link */}
      {/* By passing steps, we are activating purchase steps which are disabled by default. */}
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            // The address comes from the state.
            value={address}
            required
            // setAdress to whatever we type in.
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            // The city comes from the state.
            value={city}
            required
            // setAdress to whatever we type in.
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            // The postal code comes from the state.
            value={postalCode}
            required
            // setAdress to whatever we type in.
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            // The country comes from the state.
            value={country}
            required
            // setAdress to whatever we type in.
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
