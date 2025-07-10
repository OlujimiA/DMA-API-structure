const adminService = require('../services/adminServices');
const userService = require('../services/userServices');
const getUserId = require('../utils/getUserId');

exports.getAllAdmins = async (req, res) => {
    try {
        const rolename = 'admin'
        const role = await adminService.getRoleByName(rolename);
        if (!role) return res.status(404).json({ message: 'Admin role not found' });

        const admins = await adminService.getAllAdmins(role.id);
        if (admins.length === 0) return res.status(404).json({ message: 'admins not found' });
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ message: 'Could not get admins', Error: err.message});
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const rolename = 'admin'
        const role = await adminService.getRoleByName(rolename);
        if (!role) return res.status(404).json({ message: 'Admin role not found' });
        const role_id = role.id;

        const id = req.params.id;
        const admin = await adminService.getAdmin({ id, role_id });
        if (!admin) return res.status(404).json({ message: 'admin not found' });
        res.status(200).json(admin);

    } catch (err) {
        res.status(500).json({ message: 'Could not get admin', Error: err.message});
    }
}

exports.getRoles = async (req, res) => {
    try {
        const roles = await adminService.getRoles();
        if (!roles) return res.status(404).json({ message: 'roles not found' });
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ message: 'Could not get roles', Error: err.message});
    }
}

exports.getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await adminService.getRoleById(id);
        if (!role) return res.status(404).json({ message: 'role not found' });
        res.status(200).json(role);

    } catch (err) {
        res.status(500).json({ message: 'Could not get admin', Error: err.message});
    }
}

exports.createRole = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ message: 'title and description are required'});

        const role = await adminService.getRoleByName(title);
        if (role) return res.status(400).json({ message: 'role already exists' });

        const user_id = await getUserId.getUserIdFromHeader(req);
        const newRole = await adminService.createRole({ title, description, user_id});
        res.status(201).json({ message: 'Role has been created successfully', role: newRole });
    } catch (err) {
        res.status(500).json({ message: 'Could not create role', Error: err.message});
    }
}

exports.updateRole = async (req, res) => {
    try {
        const id = req.params.id
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ message: 'title and description are required'});

        const role = await adminService.getRoleById(id);
        if (!role) return res.status(404).json({ message: 'role not found' });

        const updatedRole = await adminService.updateRole(id, { title, description });
        res.status(200).json({ message: 'Role has been created successfully', role: updatedRole });
    } catch (err) {
        res.status(500).json({ message: 'Could not update role', Error: err.message});
    }
}

exports.makeAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required'});

        const user = await userService.getuserByEmail(email);
        if(!user) return res.status(404).json({ message: 'user not found' });
        const user_id = user.id;

        const rolename = 'admin'
        const role = await adminService.getRoleByName(rolename);
        if (!role) return res.status(404).json({ message: 'Admin role not found' });
        const role_id = role.id;

        const admin = await adminService.makeAdmin({ user_id, role_id });

        res.status(200).json({ message: 'user has been made an admin successfully!', user: admin});
    } catch (err) {
        res.status(500).json({ message: 'Could not make admin', Error: err.message})
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await adminService.getRoleById(id);
        if(!role) return res.status(404).json({ message: 'role not found' });

        const deleted = await adminService.deleteRole(id);
        res.status(200).json({ message: 'Role has been deleted successfully!', role: deleted});
        
    } catch (err) {
        res.status(500).json({ message: 'Could not delete Role', Error: err.message })
    }
};