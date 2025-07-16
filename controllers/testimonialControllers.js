const testimonialService = require('../services/testimonialServices.js');
const { sendSuccess, sendError } = require('../utils/response');

exports.getAlltestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getAlltestimonials();
    if (testimonials.length===0) return sendError(res, 404, 'testimonials not found');

    return sendSuccess(res, 200, testimonials);
  } catch (err) {
    return sendError(res, 500, 'Could not fetch testimonials', err.message);
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);
    if (!testimonial) return sendError(res, 404, 'testimonial not found');
    return sendSuccess(res, 200, testimonial);

  } catch (err){
    return sendError(res, 500, 'Server error', err.message);
  }
  
};

exports.createTestimonial = async (req, res) => {
  try {
    const { message, organisation_id, user_id } = req.body;

    if (!message || !organisation_id || !user_id) {
      return sendError(res, 400, 'All fields are required - message, organisation_id, and user_id');
    }

    const newtestimonial = await testimonialService.createTestimonial({
      message,
      organisation_id,
      user_id
    });

    return sendSuccess(res, 201, { testimonial: newtestimonial }, 'testimonial created successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not create testimonial', err.message);
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await testimonialService.deleteTestimonial(id);

    if (!deleted) {
      return sendError(res, 404, 'testimonial not found');
    }

    return sendSuccess(res, 200, { testimonial: deleted }, 'testimonial deleted successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not delete testimonial', err.message);
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    if (!message) {
      return sendError(res, 400, 'All fields are required - message');
    }

    const updated = await testimonialService.updateTestimonial(id, { message });

    if (!updated) {
      return sendError(res, 404, 'testimonial not found');
    }

    return sendSuccess(res, 200, { testimonial: updated }, 'testimonial updated successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not update testimonial', err.message);
  }
};
