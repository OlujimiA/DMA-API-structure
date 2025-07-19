const { prisma } = require('../config/db');

const getAlltestimonials = async () => {
  const testimonial = await prisma.testimonial.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return testimonial;
};

const getTestimonialById = async (id) => {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: id },
    include: {
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return testimonial;
};

const getTestimonialsByServiceId = async (id) => {
  const testimonials = await prisma.testimonial.findMany({
    where: { service_id: id },
    include: {
      user: {
        select: {
          name: true,
        }
      }
    },
  });
  return testimonials;
};

const createTestimonial = async ({ message, organisation_id, user_id }) => {
  const testimonial = await prisma.testimonial.create({
    data: {
      message: message,
      organisation_id: organisation_id,
      user_id: user_id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  
  return  testimonial;
};

const deleteTestimonial = async (id) => {
  const deleted = await prisma.testimonial.delete({
    where: { id: id },
    include: {
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });

  return deleted; 
};

const updateTestimonial = async (id, { message }) => {
  const updated = await prisma.testimonial.update({
    where: { id: id },
    data: {
      message: message,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      }, 
    },
  });
  return updated; 
};


module.exports = {
  getAlltestimonials,
  getTestimonialById,
  getTestimonialsByServiceId,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
};