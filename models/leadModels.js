const db = require('../config/db');

const getAllLeads = async () => {
  const [rows] = await db.query('SELECT * FROM `lead`');
  return rows;
};

const getLeadByOrgId = async (id) => {
  const [rows] = await db.query('SELECT id, message, service_interested, client_id FROM `lead` WHERE organisation_id = ?', [id]);
  return rows;
};

const createLead = async ({ message, service_interested, organisation_id, client_id }) => {
  const [result] = await db.execute(
    `INSERT INTO \`lead\` (message, service_interested, organisation_id, client_id)
     VALUES (?, ?, ?, ?)`,
    [message, service_interested, organisation_id, client_id]
  );
  
  return {
    id: result.insertId,
    message,
    service_interested,
    organisation_id,
    client_id
  };
};

const deleteLead = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM \`leads\` WHERE id = ?`,
    [id]
  );
  return result; 
};

const updateLead = async (id, { message, service_interested }) => {
  const [result] = await db.execute(
    `UPDATE \`leads\` SET message = ?, service_interested = ? WHERE id = ?`,
    [message, service_interested, id]
  );
  return result; 
};


module.exports = {
  getAllLeads,
  getLeadByOrgId,
  createLead,
  deleteLead,
  updateLead,
};