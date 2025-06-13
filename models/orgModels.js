const db = require('../config/db');

const getAllorgs = async () => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, website, address FROM organisation');
  return rows;
};

const getorgById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, website, address FROM organisation WHERE id = ?', [id]);
  return rows;
};

module.exports = {
  getAllorgs,
  getorgById,
};