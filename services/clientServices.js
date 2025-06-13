const clientModel = require('../models/clientModels.js');

const getAllclients = async () => {
  return await clientModel.getAllclients();
};

const getclientById = async (id) => {
  return await clientModel.getclientById(id);
};

const createClient = async (ClientData) => {
  return await clientModel.createClient(ClientData);
};

module.exports = {
  getAllclients,
  getclientById,
  createClient,
};