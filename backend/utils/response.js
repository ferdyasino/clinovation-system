exports.success = (res, message, data = {}) => {
  return res.json({
    success: true,
    message,
    data
  });
};

exports.error = (res, message, err = {}, status = 500) => {
  const statusCode = err.status || status;
  return res.status(statusCode).json({
    success: false,
    message,
    error: err?.message || err
  });
};
