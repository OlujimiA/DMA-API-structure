const db = require('../config/db');

const getAllorgs = async () => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, website, address FROM organisation');
  return rows;
};

const getorgById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, website, address FROM organisation WHERE id = ?', [id]);
  return rows;
};

const createOrg = async ({ name, email, tel, website, address, password }) => {
  const [result] = await db.query(
    `INSERT INTO organisation (name, email, tel, website, address, password)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, tel, website, address, password]
  );
  
  return {
    id: result.insertId,
    name,
    email,
    tel,
    website,
    address
  };
};

module.exports = {
  getAllorgs,
  getorgById,
  createOrg,
};