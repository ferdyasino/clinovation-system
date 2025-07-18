exports.success = (res, message, data = {}) =>
  res.json({ success: true, message, data });

exports.error = (res, message, err = {}) =>
  res.status(500).json({ success: false, message, error: err.message || err });
