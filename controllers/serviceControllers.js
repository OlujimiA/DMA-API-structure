const serviceService = require('../services/serviceServices');
const getUserId = require('../utils/getUserId');

exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        if (services.length === 0) return res.status(404).json({ message: 'No services are available' })
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get our services', Error: err.message })
    }
};

exports.getService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await serviceService.getService(id);
        if (!service) return res.status(404).json({ message: 'service not found' });
        res.status(200).json({ Service: service });
    } catch (err) {
        res.status(500).json({ message: 'Could not get your requested service ', Error: err.message});
    }
}; 

exports.createService = async (req, res) => {
    try {
        const { title, subtitle, description, imageURL } = req.body;
        if (!title || !subtitle || !description || !imageURL) return res.status(400).json({ message: 'All fields are required - title, subtitle, description, imageURL '});

        const user_id = await getUserId.getUserIdFromHeader(req);

        const newService = await serviceService.createService({ title, subtitle, description, imageURL, user_id });
        res.status(201).json({ message: 'Service created successfully!', Service: newService});
    } catch (err) {
        res.status(500).json({ message: 'Failed to create Service', Error: err.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, subtitle, description, imageURL } = req.body;
        if (!title || !subtitle || !description || !imageURL) return res.status(400).json({ message: 'All fields are required - title, subtitle, description, imageURL '});

        const updated = await serviceService.updateService(id, { title, subtitle, description, imageURL });
        res.status(200).json({ message: "service was updated successfully!", service: updated });
    } catch (err) {
        res.status(500).json({ message: 'Could not update service', Error: err.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await serviceService.deleteService(id);
        if (!service) return res.status(404).json({ message: 'service not found' });

        res.status(200).json({ message: 'Service has been deleted', Service: service})
    } catch (err) {
        res.status(500).json({ message: 'Could not delete this service', Error: err.message });
    }
};