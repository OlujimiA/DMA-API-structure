const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

const login = async (email, password) => {
  const user = await userModel.getuserByEmail(email);
  if (!user) throw new Error( 'user not found' );

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error ( 'invalid email or password' );

  // create token
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  const { password: _, ...safeUser } = user;
  return { tokens: {accessToken, refreshToken}, user: safeUser };
};


const getAllusers = async () => {
  return await userModel.getAllusers();
};

const getuserById = async (id) => {
  return await userModel.getuserById(id);
};

const getuserByEmail = async (email) => {
  return await userModel.getuserByEmail(email);
};

const createUser = async (userData) => {
  const { email } = userData;
  const existingUser = await userModel.getuserByEmail(email);
  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 400;  
    throw error;
  }
  return await userModel.createUser(userData);
};

const updateUser = async (id, updateData) => {
  return await userModel.updateUser(id, updateData);
};

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

const saveToken = async (tokenData) => {
  return await userModel.saveToken(tokenData);
};

const getToken = async (id) => {
  return await userModel.getToken(id);
};

const updatePassword = async (updateData) => {
  return await userModel.updatePassword(updateData);
};

const getOTP = async (otpData) => {
  return await userModel.getOTP(otpData);
};

const saveOTP = async (otpData) => {
  return await userModel.saveOTP(otpData);
};

const verifyEmail = async (id) => {
  return await userModel.verifyEmail(id);
};

const profile = async (id, profileData) => {
  return await userModel.profile(id, profileData);
};

module.exports = {
  getAllusers,
  getuserById,
  getuserByEmail,
  createUser,
  updateUser,
  deleteUser,
  login,
  saveToken,
  getToken,
  updatePassword,
  saveOTP,
  verifyEmail,
  getOTP,
  profile,
};