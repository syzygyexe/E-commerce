import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // trim() is a string method that is used to remove whitespace characters from the start and end of a string.
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    // inline because we are putting it inside of the header.
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='searchbox'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
