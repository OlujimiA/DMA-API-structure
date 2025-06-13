const db = require('../config/db');

const getAllclients = async () => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, country FROM client');
  return rows;
};

const getclientById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, tel AS phone_number, country FROM client WHERE id = ?', [id]);
  return rows;
};

const createClient = async ({ name, email, tel, country, password }) => {
  const [result] = await db.query(
    `INSERT INTO client (name, email, tel, country, password)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, tel, country, password]
  );
  
  return {
    id: result.insertId,
    name,
    email,
    tel
  };
};

const deleteClient = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM client WHERE id = ?`,
    [id]
  );
  return result; 
};

module.exports = {
  getAllclients,
  getclientById,
  createClient,
  deleteClient,
};