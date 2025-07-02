const serviceService = require('../services/serviceServices');
const getUserIdFromCookie = require('../utils/getUserId');

exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        if (!services) return res.status(404).json({ message: 'No services are available' })
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get our services' })
    }
};

exports.getService = async (req, res) => {
    try {
        const id = req.params;
        const service = await serviceService.getService(id);
        if (!service) return res.status(404).json({ message: 'service not found' });
        res.status(200).json({ Service: service });
    } catch (err) {
        res.status(500).json({ message: 'Could not get yur requitred service '});
    }
}; 

exports.createService = async (req, res) => {
    try {
        const { title, subtitle, description, imageURL } = req.body;
        if (!title || !subtitle || !description || !imageURL) return res.status(401).json({ message: 'All fields are required - title, subtitle, description, imageURL '});

        const user_id = getUserIdFromCookie(req);

        const newService = await serviceService.createService({ title, subtitle, description, imageURL, user_id });
        res.status(201).json({ message: 'Service created successfully!', Service: newService});
    } catch (err) {
        res.status(500).json({ message: 'Failed to create Service'});
    }
};

exports.updateService = async (req, res) => {

};

exports.deleteService = async (req, res) => {
    try {
        const id = req.params;
        const service = await serviceService.deleteService(id);
        if (!service) return res.status(404).json({ message: 'service not found' });

        res.status(200).json({ message: 'Service has been deleted', Service: service})
    } catch (err) {
        res.status(500).json({ message: 'Could not delete this service' });
    }
};