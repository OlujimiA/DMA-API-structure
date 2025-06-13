const db = require('../config/db');

const getAllclients = async () => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, country FROM client');
  return rows;
};

const getclientById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, country FROM client WHERE id = ?', [id]);
  return rows;
};

module.exports = {
  getAllclients,
  getclientById,
};