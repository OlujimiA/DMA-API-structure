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

const createService = async ({ title, subtitle, description, imageURL, user_id }) => {
    const service = await prisma.service.create({
        data: {
            title: title,
            subtitle: subtitle,
            description: description,
            imageURL: imageURL,
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

const updateService = async (id, { title, subtitle, description, imageURL }) => {
    const service = await prisma.service.update({
        where: { id: id },
        data: {
            title: title,
            subtitle: subtitle,
            description: description,
            imageURL: imageURL,
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

module.exports = {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService,
}