const prisma = require('../config/db');

const getAlltestimonials = async () => {
  const testimonial = await prisma.testimonial.findMany({
    select: {
      id: true, message: true, 
      user_id: true, 
      user: {
        select: {
          name: true,
        },
      }, 
      organisation_id: true, 
      organisation: {
        select: {
          name: true,
        },
      },
    },
  });
  return testimonial;
};

const getTestimonialByOrgId = async (id) => {
  const testimonial = await prisma.testimonial.findMany({
    where: { organisation_id: parseInt(id) },
    select: {
      id: true, message: true, 
      user_id: true, 
      user: {
        select: {
          name: true,
        },
      }, 
      organisation_id: true, 
      organisation: {
        select: {
          name: true,
        },
      },
    },
  });
  return testimonial;
};

const createTestimonial = async ({ message, organisation_id, user_id }) => {
  const testimonial = await prisma.testimonial.create({
    data: {
      message: message,
      organisation_id: organisation_id,
      user_id: user_id,
    },
    select: {
      id: true, message: true, 
      user_id: true, 
      user: {
        select: {
          name: true,
        },
      }, 
      organisation_id: true, 
      organisation: {
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
    where: { id: parseInt(id)},
    select: {
      id: true, message: true, 
      user_id: true, 
      user: {
        select: {
          name: true,
        },
      }, 
      organisation_id: true, 
      organisation: {
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
    where: { id: parseInt(id)},
    data: {
      message: message,
    },
    select: {
      id: true, message: true, 
      user_id: true, 
      user: {
        select: {
          name: true,
        },
      }, 
      organisation_id: true, 
      organisation: {
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
  getTestimonialByOrgId,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
};