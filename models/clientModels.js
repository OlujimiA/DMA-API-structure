const prisma = require('../config/db');

const getAllclients = async () => {
  const clients = await prisma.client.findMany({
    omit: {
      password: true,
    },
  });
  return clients;
};

const getclientById = async (id) => {
  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
    omit: {
      password: true,
    },
  });
  return client;
};

const createClient = async ({ name, email, tel, country, password }) => {
  const result = await prisma.client.create({
    data: {
      name: name, email: email, tel: tel, country: country, password: password,
    },
    omit: {
      password: true,
    },
  });
  return result;
};

const updateClient = async (id, { name, email, tel, country, password }) => {
  const result = await prisma.client.update({
    where: {id: parseInt(id)},
    data: {
      name: name, email: email, tel: tel, country: country, password: password,
    },
    omit: {
      password: true,
    },
  });
  return result;
};

const deleteClient = async (id) => {
  const client = await prisma.client.delete({
    where: {id: parseInt(id)},
    omit: {
      password: true,
    }
  });
  return client;
};

module.exports = {
  getAllclients,
  getclientById,
  createClient,
  updateClient,
  deleteClient,
};