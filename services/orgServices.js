const orgModel = require('../models/orgModels.js');

const getAllorgs = async () => {
  return await orgModel.getAllorgs();
};

const getorgById = async (id) => {
  return await orgModel.getorgById(id);
};

module.exports = {
  getAllorgs,
  getorgById,
};