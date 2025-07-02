const serviceModel = require('../models/serviceModels');

const getAllServices = async () => {
    return await serviceModel.getAllServices();
};

const getService = async (id) => {
    return await serviceModel.getService(id);
};

const createService = async (serviceData) => {
    return await serviceModel.createService(serviceData);
};

const deleteService = async (id) => {
    return await serviceModel.deleteService(id);
};

module.exports = {
    getAllServices,
    getService,
    createService,
    deleteService,
};