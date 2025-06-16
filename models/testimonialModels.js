const db = require('../config/db');

const getAlltestimonials = async () => {
  const [rows] = await db.query('SELECT * FROM testimonial');
  return rows;
};

const getTestimonialByOrgId = async (id) => {
  const [rows] = await db.query('SELECT * FROM testimonial WHERE organisation_id = ?', [id]);
  return rows;
};

const createTestimonial = async ({ message, organisation_id, client_id }) => {
  const [result] = await db.query(
    `INSERT INTO testimonial (message, organisation_id, client_id)
     VALUES (?, ?, ?)`,
    [message, organisation_id, client_id]
  );
  
  return {
    id: result.insertId,
    message,
    organisation_id,
    client_id
  };
};

const deleteTestimonial = async (id) => {
  const [result] = await db.query(
    `DELETE FROM testimonial WHERE id = ?`,
    [id]
  );
  return result; 
};

const updateTestimonial = async (id, { message }) => {
  const [result] = await db.query(
    `UPDATE testimonial SET message = ? WHERE id = ?`,
    [message, id]
  );
  return result; 
};


module.exports = {
  getAlltestimonials,
  getTestimonialByOrgId,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
};