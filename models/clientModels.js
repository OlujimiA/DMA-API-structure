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

const getclientByEmail = async (email) => {
  const rows = await prisma.client.findUnique({
    where: { email: email },
    omit: {
      password: true,
    }
  });
  return rows;
}

const createClient = async ({ name, email, tel, country, address, category, password }) => {

  const result = await prisma.client.create({
    data: {
      name: name, email: email, tel: tel, country: country, address: address, category: category, password: password,
    },
    omit: {
      password: true,
    },
  });
  return result;
};

const updateClient = async (id, { name, email, tel, country, address, category, password }) => {
  const result = await prisma.client.update({
    where: {id: parseInt(id)},
    data: {
      name: name, email: email, tel: tel, country: country, address: address, category: category, password: password,
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

const saveToken = async ({ hashedToken, expiresAt, id }) => {
  const token = await prisma.ptoken.create({
    data: {
      client_id: id,
      token: hashedToken,
      expires_at: expiresAt,
      created_at: new Date(),
    },
  });
  return token;
};

const getToken = async (id) => {
  const token = await prisma.ptoken.findFirst({
    where: {
      client_id: parseInt(id),
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return token;
};

const updatePassword = async (id, password) => {
  const client = await prisma.client.update({
    where: {id: id},
    data: {
      password: password,
    },
    omit: {
      password: true,
    }
  });
  return client;
};

const saveOTP = async ({ hashedOTP, expiresAt, id }) => {
  const otp = await prisma.otp.create({
    data: {
      client_id: id,
      otp: hashedOTP,
      expires_at: expiresAt,
      created_at: new Date(),
    },
  });
  return otp;
};

const verifyEmail = async (id) => {
  const client = await prisma.client.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status: 'verified',
    },
    omit: {
      password: true,
    }
  });
  return client;
};

const getOTP = async (id) => {
  const otp = await prisma.otp.findFirst({
    where: {
      client_id: parseInt(id),
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return otp;
};

module.exports = {
  getAllclients,
  getclientById,
  getclientByEmail,
  createClient,
  updateClient,
  deleteClient,
  saveToken,
  getToken,
  updatePassword,
  saveOTP,
  verifyEmail,
  getOTP,
};