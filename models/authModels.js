const prisma = require('../config/db');

const getUserByEmail = async (email) => {
  const rows = await prisma.user.findUnique({
    where: { email: email },
  });
  return rows;
}

const signup = async ({ email, role, password}) => {
  const result = await prisma.user.create({
    data: {
      email: email,
      role: role,
      password: password,
    },
    select: {
      id: true,
      email: true,
      role: true,
    } 
  });
  return result;
};


module.exports = {
  getUserByEmail,
  signup,
};

