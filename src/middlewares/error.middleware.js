export const notFoundError = (req, res, next) => {
  const error = new Error("Not Found routes");

  error.status = 404;
  error.message = "Invalid route";

  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;

  res.status(status).json({
    status: "Error",
    code: status,
    message: error.message || "Internal server error",
  });
};
