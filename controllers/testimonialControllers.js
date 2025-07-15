const testimonialService = require('../services/testimonialServices.js');

exports.getAlltestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialService.getAlltestimonials();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch testimonials', error: err.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'testimonial not found' });
    res.status(200).json(testimonial);

  } catch (err){
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};

exports.createTestimonial = async (req, res) => {
  try {
    const { message, organisation_id, user_id } = req.body;

    if (!message || !organisation_id || !user_id) {
      return res.status(400).json({ message: 'All fields are required - message, organisation_id, and user_id' });
    }

    const newtestimonial = await testimonialService.createTestimonial({
      message,
      organisation_id,
      user_id
    });

    res.status(201).json({ message: 'testimonial created successfully', testimonial: newtestimonial });
  } catch (err) {
    res.status(500).json({ message: 'Could not create testimonial', error: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await testimonialService.deleteTestimonial(id);

    if (!deleted) {
      return res.status(404).json({ message: 'testimonial not found' });
    }

    res.json({ message: 'testimonial deleted successfully', testimonial: deleted});
  } catch (err) {
    res.status(500).json({ message: 'Could not delete testimonial', error: err.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;

    if (!message) {
      return res.status(400).json({ message: 'All fields are required - message' });
    }

    const updated = await testimonialService.updateTestimonial(id, { message });

    if (!updated) {
      return res.status(404).json({ message: 'testimonial not found' });
    }

    res.json({ message: 'testimonial updated successfully', testimonial: updated });
  } catch (err) {
    res.status(500).json({ message: 'Could not update testimonial', error: err.message });
  }
};
