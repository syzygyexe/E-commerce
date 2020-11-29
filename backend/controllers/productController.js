// Middleware for handling exceptions inside of async express routes, passing them to you or to your error handlers(simplification for try and catch method)
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  // How many items per page.
  const pageSize = 12;
  // ?pageNumber=1, ?pageNumber=2, etc. If not included, obviously we are on page 1, therefore, || 1.
  const page = Number(req.query.pageNumber) || 1;

  // req.query is how we are getting the query in the URL. The query which we have defined inside of the
  // frontend/actions/productActions >>> listProducts >>> `/api/products?keyword=${keyword}`.
  // Namely, we are getting everything after the "?".
  const keyword = req.query.keyword
    ? {
        // The reason why we are setting our name variable with the help of regular expression,
        // is because we do not want our user to write exact name of the product inside of the
        // SearchBox in order to find the product. We want to give the iPhone result, if the user's input was iph, etc.
        name: {
          $regex: req.query.keyword,
          // i stands for insensitive.
          $options: "i",
        },
      }
    : {};

  // Count all products in the DB.
  // UPD: ...keyword is going to have a name in it, or an empty string.
  const count = await Product.countDocuments({ ...keyword });

  // Whenever we use a mongoose method, it returns a promise.
  // Therefore we need await or .then
  // UPD: ...keyword is going to have a name in it, or an empty string.
  const products = await Product.find({ ...keyword })
    // Limit our search with a pageSize.
    .limit(pageSize)
    // Give us the right items, for the right page. If we are on ?pageNumber=2, give us items for 2nd page for our search.
    .skip(pageSize * (page - 1));
  // What we can get with the req.
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  // req.params.id is the id inside of the URL
  const product = await Product.findById(req.params.id);
  if (product) {
    // Converting our products array into json format
    res.json(product);
  } else {
    res.status(404);
    // Implementing our custom error handler
    throw new Error("Product not found");
  }
});

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // req.params.id is the id inside of the URL
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    // Implementing our custom error handler
    throw new Error("Product not found");
  }
});

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Create new review
// @route  POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  // We need to find the product which we are reviewing.
  const product = await Product.findById(req.params.id);

  if (product) {
    // r.user is coming from the productModel inside of the reviewSchema.
    // req.user._id is the currently logged-in user.
    // Basically, we are looking in our DB whether the current user made a review already or not.
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      // currently logged-in user.
      name: req.user.name,
      // Rating and comment are coming from the req.body above.
      // However, we just want to make our rating a number.
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // Append new review to our array of reviews.
    product.reviews.push(review);
    // Update numReviews.
    product.numReviews = product.reviews.length;
    // Update rating, by calculating average review score.
    product.rating =
      product.reviews.reduce(
        (accumulator, item) => item.rating + accumulator,
        0
      ) / product.reviews.length;

    // Save product to the DB.
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  // Find all products. Sort it in a descending order with the help of -1.
  // Set it only to 3 products.
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
