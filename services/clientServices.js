const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const clientModel = require('../models/clientModels.js');

const login = async (email, password) => {
  const user = await clientModel.getclientByEmail(email);
  if (!user) return res.status(403).json({ message: 'client not found' });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(403).json({ message: 'invalid email or password' });

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

  return { tokens: {accessToken, refreshToken}, user: user };
};


const getAllclients = async () => {
  return await clientModel.getAllclients();
};

const getclientById = async (id) => {
  return await clientModel.getclientById(id);
};

const getclientByEmail = async (email) => {
  return await clientModel.getclientByEmail(email);
};

const createClient = async (ClientData) => {
  return await clientModel.createClient(ClientData);
};

const updateClient = async (id, updateData) => {
  return await clientModel.updateClient(id, updateData);
};

const deleteClient = async (id) => {
  return await clientModel.deleteClient(id);
};

const saveToken = async (tokenData) => {
  return await clientModel.saveToken(tokenData);
};

const getToken = async (id) => {
  return await clientModel.getToken(id);
};

const updatePassword = async (updateData) => {
  return await clientModel.updatePassword(updateData);
};

const getOTP = async (otpData) => {
  return await clientModel.getOTP(otpData);
};

const saveOTP = async (otpData) => {
  return await clientModel.saveOTP(otpData);
};

const verifyEmail = async (id) => {
  return await clientModel.verifyEmail(id);
};

module.exports = {
  getAllclients,
  getclientById,
  getclientByEmail,
  createClient,
  updateClient,
  deleteClient,
  login,
  saveToken,
  getToken,
  updatePassword,
  saveOTP,
  verifyEmail,
  getOTP,
};