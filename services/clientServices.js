const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const clientModel = require('../models/clientModels.js');

const login = async (email, password) => {
  const user = await clientModel.getclientByEmail(email);
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

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

const createClient = async (ClientData) => {
  return await clientModel.createClient(ClientData);
};

const updateClient = async (id, updateData) => {
  return await clientModel.updateClient(id, updateData);
};

const deleteClient = async (id) => {
  return await clientModel.deleteClient(id);
};

module.exports = {
  getAllclients,
  getclientById,
  createClient,
  updateClient,
  deleteClient,
  login,
};