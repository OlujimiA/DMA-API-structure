const prisma = require('../config/db');

const getAllorgs = async () => {
  const orgs = await prisma.organisation.findMany();
  return orgs;
};

const getorgById = async (id) => {
  const org = await prisma.organisation.findUnique({
    where: {id: parseInt(id)},
  });
  return org;
};

const createOrg = async ({ name, email, address, country, type, industry, rc_number, logo_url }) => {
  const org = await prisma.organisation.create({
    data: {
      name: name, 
      email: email,
      address: address,  
      country: country,  
      type: type,
      industry: industry,
      rc_number: rc_number,
      logo_url: logo_url,
    },
  });
  return org;
};

const updateOrg = async (id, { name, email, address, country, type, industry, rc_number, logo_url }) => {
  const updated = await prisma.organisation.update({
    where: { id: parseInt(id) },
    data: {
      name: name, 
      email: email,
      address: address,  
      country: country,  
      type: type,
      industry: industry,
      rc_number: rc_number,
      logo_url: logo_url,
    },
  });
  return updated;
};

const deleteOrg = async (id) => {
  const deleted = await prisma.organisation.delete({
    where: { id: parseInt(id) },
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