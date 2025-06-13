const orgModel = require('../models/orgModels.js');

const getAllorgs = async () => {
  return await orgModel.getAllorgs();
};

const getorgById = async (id) => {
  return await orgModel.getorgById(id);
};

const createOrg = async (OrgData) => {
  return await orgModel.createOrg(OrgData);
};

module.exports = {
  getAllorgs,
  getorgById,
  createOrg,
};