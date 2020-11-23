// 404 not found error handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// custom error handler, which will be responding with json format, instead of initial HTML format. Also, it will be providing us with the stack trace during the production development.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "prodction" ? null : err.stack,
  });
};

export { notFound, errorHandler };
