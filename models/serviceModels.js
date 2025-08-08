const { prisma } = require('../config/db');

const getAllServices = async () => {
    const services = await prisma.service.findMany({
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        }
    });
    return services;
};

const getService = async (id) => {
    const service = await prisma.service.findUnique({
        where: { id: id },
    });
    return service;
};

const createService = async ({ title, subtitle, description, banner_url, user_id }) => {
    const service = await prisma.service.create({
        data: {
            title: title,
            subtitle: subtitle,
            description: description,
            banner_url: banner_url,
            admin_id: user_id,
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        }
    });
    return service;
};

const updateService = async (id, { title, subtitle, description, banner_url }) => {
    const service = await prisma.service.update({
        where: { id: id },
        data: {
            title: title,
            subtitle: subtitle,
            description: description,
            banner_url: banner_url,
        },
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        }
    });
    return service;
};

const deleteService = async (id) => {
    const service = await prisma.service.delete({
        where: { id: id },
    });
    return service;
};

const getCaseStudiesByServiceId = async (id) => {
    const caseStudies = await prisma.case_studies.findMany({
        where: { service_id: id },
        include: {
            organisation: {
                select: {
                    name: true,
                }
            }
        }
    });
    return caseStudies
};

module.exports = {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService,
    getCaseStudiesByServiceId,
}