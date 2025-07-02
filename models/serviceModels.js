const prisma = require('../config/db');

const createService = async ({ title, subtitle, description, imageURL }) => {
    const service = await prisma.service.create({
        data: {
            title: title,
            subtitle: subtitle,
            description: description,
            imageURL: imageURL,
        },
    });
    return service;
};

const getAllServices = async () => {
    const services = await prisma.service.findMany();
    return services;
};

const getService = async (id) => {
    const service = await prisma.service.findUnique({
        where: { id: parseInt(id) },
    });
    return service;
};

const deleteService = async (id) => {
    const service = await prisma.service.delete({
        where: { id: parseInt(id) },
    });
    return service;
};

module.exports = {
    createService,
    getAllServices,
    getService,
    deleteService,
}