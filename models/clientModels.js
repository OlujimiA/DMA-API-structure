const prisma = require('../config/db');

const getAllclients = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
  return users;
};

const getclientById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    omit: {
      password: true,
    },
  });
  return user;
};

const getclientByEmail = async (email) => {
  const rows = await prisma.user.findUnique({
    where: { email: email }
  });
  return rows;
}

const createClient = async ({ name, email, tel, country, address, category, password }) => {

  const result = await prisma.user.create({
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
  const result = await prisma.user.update({
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
  const user = await prisma.user.delete({
    where: {id: parseInt(id)},
    omit: {
      password: true,
    }
  });
  return user;
};

const saveToken = async ({ hashedToken, expiresAt, id }) => {
  const token = await prisma.ptoken.create({
    data: {
      user_id: id,
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
      user_id: parseInt(id),
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return token;
};

const updatePassword = async (id, password) => {
  const user = await prisma.user.update({
    where: {id: id},
    data: {
      password: password,
    },
    omit: {
      password: true,
    }
  });
  return user;
};

const saveOTP = async ({ hashedOTP, expiresAt, id }) => {
  const otp = await prisma.otp.create({
    data: {
      user_id: id,
      otp: hashedOTP,
      expires_at: expiresAt,
      created_at: new Date(),
    },
  });
  return otp;
};

const verifyEmail = async (id) => {
  const client = await prisma.user.update({
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
      user_id: parseInt(id),
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return otp;
};

const profile = async (id, { pfp_url, doc_url, business_status }) => {
  const profile = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      pfp_url: pfp_url,
      doc_url: doc_url,
      business_status: business_status,
    },
    omit: {
      password: true,
    }
  });
  return profile;
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
  profile,
};