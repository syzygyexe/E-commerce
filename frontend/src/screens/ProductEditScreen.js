import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  // These are coming from the ../reducers/productReducers.js
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  // These are coming from the ../reducers/productReducers.js
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      // Reset cache when a product is successfully updated.
      dispatch({ type: PRODUCT_UPDATE_RESET });
      // Redirect to /admin/productlist after successful product update.
      history.push("/admin/productlist");
    } else {
      // if product.name does not exist or product._id is not equal to the ID in the URL.
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        // If product already exist and product._id is matching the ID in the URL.
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  // When an image being selected in order to be uploaded, we want to make an async HTTP request,
  // and pass (e) in order to get an access to the passed in file(s). In our case image(s).
  const uploadFileHandler = async (e) => {
    // In the end we have a const file, which is an array of images. It is an array,
    // because admin has the ability to upload multiple files simultaneously.
    // Consequently, we are passing [0] of that array, because our website allows only 1 image to be uploaded.
    const file = e.target.files[0];

    // Our images are going to be passed in here.
    const formData = new FormData();
    // Call to an "image"(just like we did on the backend in the middleware),
    // inside of the /backend/routes/orderRoutes >>> router.post
    // Append the file(uploaded image) to it.
    formData.append("image", file);
    // Activate <Loader /> spinner.
    setUploading(true);

    try {
      const config = {
        header: {
          // Uploaded image must have a Content-Type of multipart/form-data.
          "Content-Type": "multipart/form-data",
        },
      };
      // Making a post method, passing formData and config as an arguments.
      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Alter product's information with a button click. All variables are taken from the state.
  const submitHandler = (e) => {
    // Prevent page to refresh.
    e.preventDefault();
    dispatch(
      updateProduct({
        // productId is coming from the URL.
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {/* If loading, show Loader. If error, show error. */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                // The name comes from the state.
                value={name}
                // setName to whatever we type in.
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter price'
                // The price comes from the state.
                value={price}
                // setPrice to whatever we type in.
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                // The image comes from the state.
                value={image}
                // setImage to whatever we type in.
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                // custom prop.
                custom
                // Whenever the file is being selected fire uploadFileHandler.
                onChange={uploadFileHandler}
              ></Form.File>
              {/* Show loader when uploading. */}
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                // The brand comes from the state.
                value={brand}
                // setBrand to whatever we type in.
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                // The countInStock comes from the state.
                value={countInStock}
                // setCountInStock to whatever we type in.
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                // The category comes from the state.
                value={category}
                // setcategory to whatever we type in.
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                // The description comes from the state.
                value={description}
                // setDescription to whatever we type in.
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
