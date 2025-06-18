const prisma = require('../config/db');

const getAllorgs = async () => {
  const orgs = await prisma.organisation.findMany({
    omit: {
      password: true,
    },
  });
  return orgs;
};

const getorgById = async (id) => {
  const org = await prisma.organisation.findUnique({
    where: {id: parseInt(id)},
    omit: {
      password: true,
    },
  });
  return org;
};

const createOrg = async ({ name, email, tel, website, address, password }) => {
  const org = await prisma.organisation.create({
    data: {
      name: name, 
      email: email, 
      tel: tel, 
      website: website, 
      address: address, 
      password: password,
    },
    omit: {
      password: true,
    }
  });
  return org;
};

const updateOrg = async (id, { name, email, tel, website, address, password }) => {
  const updated = await prisma.organisation.update({
    where: { id: parseInt(id) },
    data: {
      name: name, 
      email: email, 
      tel: tel, 
      website: website, 
      address: address, 
      password: password,
    },
    omit: {
      password: true,
    }
  });
  return updated;
};

const deleteOrg = async (id) => {
  const deleted = await prisma.organisation.delete({
    where: { id: parseInt(id) },
    omit: {
      password: true,
    }
  });
  return deleted; 
};

module.exports = {
  getAllorgs,
  getorgById,
  createOrg,
  updateOrg,
  deleteOrg,
};