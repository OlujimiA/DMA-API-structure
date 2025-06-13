const clientModel = require('../models/clientModels.js');

const getAllclients = async () => {
  return await clientModel.getAllclients();
};

const getclientById = async (id) => {
  return await clientModel.getclientById(id);
};

module.exports = {
  getAllclients,
  getclientById,
};