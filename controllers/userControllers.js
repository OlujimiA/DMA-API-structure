const bcrypt = require('bcrypt');
const userService = require('../services/userServices');
const generateOTP = require('../utils/generateOTP');
const { sendSuccess, sendError } = require('../utils/response');

exports.getAllusers = async (req, res) => {
  try {
    const users = await userService.getAllusers();
    if (!users) return sendError(res, 404, users, "Users not found" );
    return sendSuccess(res, 200, users, "Users fetched!");
  } catch (err) {
    return sendError(res, 500, "Could not get users", err.message);
  }
};

exports.getuserById = async (req, res) => {
  try {
    const user = await userService.getuserById(req.params.id);
    if (!user) return sendError(res, 404, "User not found" );
    return sendSuccess(res, 200, user, "User profile fetched!");

  } catch (err){
    return sendError(res, 500, "Could not get user", err.message);
  }
  
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, tel, country, address, category, password } = req.body;

    if (!name || !email || !tel || !country || !address || !category || !password) {
      return sendError(res, 400, 'All fields are required - name, email, tel, country, address, category, password');
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({
      name,
      email,
      tel,
      country,
      address,
      category,
      password: hashed_password,
    });

    const { otp, expiresAt } = await generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const id = newUser.id;
    const save = await userService.saveOTP({ hashedOTP, expiresAt, id });

    return sendSuccess(res, 201, {user: newUser, otp }, "User created successfully!");
  } catch (err) {
    const statusCode = err.statusCode || 500; 
    return sendError(res, statusCode, 'Could not create user', err.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, tel, country, address, category, password } = req.body;
    const { id } = req.params;

    if (!name || !email || !tel || !country || !address || !category || !password) {
      return sendError(res, 400, 'All fields are required - name, email, tel, country, address, category, password');
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const updated = await userService.updateUser(id, { name, email, tel, country, address, category, password: hashed_password });

    if (!updated) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, 500, { user: updated }, 'User updated successfully!');
  } catch (err) {
    return sendError(res, 500, 'Could not update User', err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, 200, { user: deleted }, 'User deleted successfully');
  } catch (err) {
    return sendError(res, 500, 'Could not delete user', err.message);
  }
};

exports.profile = async (req, res) => {
  try {
    const id = req.params.id;
    const { pfp_url, doc_url, business_status } = req.body;
    if (!pfp_url || !doc_url || !business_status) {
      return sendError(res, 400, 'All fields are required - pfp_url, doc_url, business_status');
    }

    const profile = await userService.profile(id, { pfp_url, doc_url, business_status});
    if (!profile) {
      return sendError(res, 404, 'User not found');
    }

    return sendSuccess(res, 200, { user: profile }, 'user profile has been successfully completed!');
  } catch (err) {
    return sendError(res, 500, 'Could not complete user profile', err.message);
  }
};