const db = require('../config/db');

const getUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM \`user\` WHERE email = ?', [email]);
  return rows[0]; 
};

const signup = async ({ email, role, password }) => {
  const [result] = await db.query(
    `INSERT INTO \`user\` (email, role, password)
     VALUES (?, ?, ?)`,
    [email, role, password]
  );
  
  return {
    id: result.insertId,
    email,
    role
  };
};

module.exports = {
  getUserByEmail,
  signup,
};

