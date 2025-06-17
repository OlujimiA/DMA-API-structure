const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModels');

const loginUser = async (email, password) => {
  const user = await authModel.getUserByEmail(email);
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  // create token
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { tokens: {accessToken, refreshToken}, user: { id: user.id, email: user.email, role: user.role } };
};

const signup = async (UserData) => {
  return await authModel.signup(UserData);
};

module.exports = {
  loginUser,
  signup,
};

