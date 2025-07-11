const { prisma, defaultUserRoleId } = require('../config/db');

const getAllusers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    include: {
      role: {
        select: {
          title: true,
        }
      }
    }
  });
  return users;
};

const getuserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    omit: {
      password: true,
    },
    include: {
      role: {
        select: {
          title: true,
        }
      }
    }
  });
  return user;
};

const getuserByEmail = async (email) => {
  const rows = await prisma.user.findUnique({
    where: { email: email },
  });
  return rows;
}

const getuserByTel = async (tel) => {
  const rows = await prisma.user.findUnique({
    where: { tel: tel },
  });
  return rows;
}

const createUser = async ({ name, email, tel, country, address, category, password }) => {

  const user = await prisma.user.create({
    data: {
      name: name, email: email, tel: tel, country: country, address: address, category: category, password: password,
      role_id: defaultUserRoleId,
    },
    omit: {
      password: true,
    },
  });

  const n_settings = await prisma.notification_settings.create({
    data: {
      user_id: user.id,
    }
  });

  const p_settings = await prisma.privacy_settings.create({
    data: {
      user_id: user.id,
    }
  });

  return user;

};

const updateUser = async (id, { name, email, tel, country, address, category, password }) => {
  const result = await prisma.user.update({
    where: {id: id},
    data: {
      name: name, email: email, tel: tel, country: country, address: address, category: category, password: password,
    },
    omit: {
      password: true,
    },
  });
  return result;

};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {id: id},
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
      user_id: id,
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
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      status: 'verified',
    },
    omit: {
      password: true,
    }
  });
  return user;
};

const getOTP = async (id) => {
  const otp = await prisma.otp.findFirst({
    where: {
      user_id: id,
      expires_at: {
        gt: new Date(),
      },
    },
  });
  return otp;
};

const profile = async (id, { pfp_url, doc_url, business_status }) => {
  const profile = await prisma.user.update({
    where: { id: id },
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
  getAllusers,
  getuserById,
  getuserByEmail,
  getuserByTel,
  createUser,
  updateUser,
  deleteUser,
  saveToken,
  getToken,
  updatePassword,
  saveOTP,
  verifyEmail,
  getOTP,
  profile,
};