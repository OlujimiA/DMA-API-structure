const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/response');

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return sendError(res, 400, 'No refresh token provided');

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1h' }
    );

    return sendSuccess(res, 200, { accessToken: newAccessToken });
  } catch (err) {
    return sendError(res, 401, 'Invalid or expired refresh token', err.message);
  }
};
