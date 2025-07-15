const testimonialModel = require('../models/testimonialModels');

const getAlltestimonials = async () => {
  return await testimonialModel.getAlltestimonials();
};

const getTestimonialById = async (id) => {
  return await testimonialModel.getTestimonialByOrgId(id);
};

const createTestimonial = async (testimonialData) => {
  return await testimonialModel.createTestimonial(testimonialData);
};

const deleteTestimonial = async (id) => {
  return await testimonialModel.deleteTestimonial(id);
};

const updateTestimonial = async (id, updateData) => {
  return await testimonialModel.updateTestimonial(id, updateData);
};

module.exports = {
  getAlltestimonials,
  getTestimonialById,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
};