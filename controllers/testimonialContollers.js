const testimonial = require('../testimonials/testimonials.js');

exports.getTestimonialByOrgId = async (req, res) => {
  const testimonial = await testimonial.getTestimonialByOrgId(req.params.id);
  if (!testimonial) return res.status(404).json({ message: 'testimonial not found' });
  res.json(testimonial);
};