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
    
  });

}

// const createClient = async ({ name, email, tel, country, password }) => {
//   const [result] = await db.query(
//     `INSERT INTO client (name, email, tel, country, password)
//      VALUES (?, ?, ?, ?, ?)`,
//     [name, email, tel, country, password]
//   );
  
//   return {
//     id: result.insertId,
//     name,
//     email,
//     tel
//   };
// };

// const deleteClient = async (id) => {
//   const [result] = await db.execute(
//     `DELETE FROM client WHERE id = ?`,
//     [id]
//   );
//   return result; 
// };

module.exports = {
  getAllclients,
  getclientById,
  createClient,
  // deleteClient,
};