const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const defaultUserRoleId = "9b3b3831-c43e-489a-8f35-faa42494ad22";

module.exports = {
  prisma,
  defaultUserRoleId,
};
