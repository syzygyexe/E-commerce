import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  // Fetching what is inside of the searchbox. Namely, by catching what is inside of the optional :keyword URL.
  // '/search/:keyword' was defined inside of the App.js file. :keyword might be nothing or there might be a keyword.
  // Whatever it is, we are passing it inside of our useEffect >>> dispatch(listProducts(keyword)).
  const keyword = match.params.keyword;
  // There is no specific page number, it is going to be 1.
  // Whatever page it is, we are passing it inside of our useEffect >>> dispatch(listProducts(pageNumber))
  const pageNumber = match.params.pageNumber || 1;

  // We are using this instead of useState
  const dispatch = useDispatch();
  // selecting product list frm the ../store.js
  // selector allows us to use parts of the state in the next line.
  const productList = useSelector((state) => state.productList);
  // passing all parts of our productList state inside the ../reducers/productReducer.js
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // Firing off our dispather in order to actually get the products, and sending it through reducer to alter our state.
    // UPD: Since this action is responsible for calling the products. We are passing keyword to it, in order to
    // make our SearchBox functioning with the back-end. Same goes for the pageNumber.
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {/* Page title name, page meta tags. */}
      <Meta />
      {/* Show carousel when there is no keyword. Basically, show Carousel when there was no input inside of the SearchBox.
      Also, if there is a keyword(when search through SearchBox was conducted), render GO BACK button to home page. */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {/* When loading show loading screen. If we have any error display it. Else, render everything */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* page and pages are taken from productList inside of this file. */}
          {/* Moreover, if keyword exists, use it. */}
          <Paginate
            pages={pages}
            page={page}
            // Moreover, if keyword exists, use it. Otherwise, no.
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
