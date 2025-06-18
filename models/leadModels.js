const prisma = require('../config/db');


const getAllLeads = async () => {
  const rows = await prisma.lead.findMany({
    select: {
      id: true,
      message: true,
      service_interested: true, 
      client_id: true,
      client: {
        select: {
          name: true,
        }
      },
      organisation_id: true,
      organisation: {
        select: {
          name: true,
        }
      },
    }
  });
  return rows;
};

const getLeadByOrgId = async (id) => {
  const lead = await prisma.lead.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      message: true,
      service_interested: true, 
      client_id: true,
      client: {
        select: {
          name: true,
        }
      },
      organisation_id: true,
      organisation: {
        select: {
          name: true,
        }
      },
    }
  });
  return lead;
};

const createLead = async ({ message, service_interested, organisation_id, client_id }) => {
  const result = await prisma.lead.create({
    data: {
      message: message, 
      service_interested: service_interested, 
      organisation_id: organisation_id, 
      client_id: client_id,
    },
    select: {
      id: true,
      message: true,
      service_interested: true, 
      client_id: true,
      client: {
        select: {
          name: true,
        }
      },
      organisation_id: true,
      organisation: {
        select: {
          name: true,
        }
      },
    }
  });
  return result;
};

const deleteLead = async (id) => {
  const result = await prisma.lead.delete({
    where: { id: parseInt(id)},
    select: {
      id: true,
      message: true,
      service_interested: true, 
      client_id: true,
      client: {
        select: {
          name: true,
        }
      },
      organisation_id: true,
      organisation: {
        select: {
          name: true,
        }
      },
    }
  });
  return result;
};

const updateLead = async (id, {message, service_interested}) => {
  const updated = await prisma.lead.update({
    where: { id: parseInt(id) },
    data: {
      message: message,
      service_interested: service_interested,
    },
    select: {
      id: true,
      message: true,
      service_interested: true, 
      client_id: true,
      client: {
        select: {
          name: true,
        }
      },
      organisation_id: true,
      organisation: {
        select: {
          name: true,
        }
      },
    }
  });
  return updated;
};

module.exports = {
  getAllLeads,
  getLeadByOrgId,
  createLead,
  deleteLead,
  updateLead,
};