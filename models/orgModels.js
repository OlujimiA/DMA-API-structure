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

const createContact = async ({ name, pfp_url, doc_url, organisation_id }) => {
  const contact = await prisma.contact.create({
    data: {
      name: name,
      pfp_url: pfp_url,
      doc_url: doc_url,
      organisation_id: organisation_id,
    }
  });
  return contact;
};

const getContact = async () => {
  const contacts = await prisma.contact.findMany({
    select: {
      name: true,
      pfp_url: true, 
      doc_url: true,
      organisation_id: true,
      organisation: {
        select: {
          name: true,
        }
      },
    }
  });
  return contacts;
};

module.exports = {
  getAllorgs,
  getorgById,
  createOrg,
  updateOrg,
  deleteOrg,
  createContact,
  getContact,
};