const bcrypt = require('bcrypt');
const userService = require('../services/userServices.js');
const generateToken = require('../utils/generateToken');
const generateOTP = require('../utils/generateOTP');
const { sendSuccess, sendError } = require('../utils/response.js');

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and Password required');
    }

    const result = await userService.login(email, password);

    if (!result) {
      return sendError(res, 401, 'Invalid credentials');
    }

    const { accessToken, refreshToken } = result.tokens

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return sendSuccess(res, 200, { AccessToken: accessToken, user: result.user }, 'Login successful!');

  } catch (err) {
    return sendError(res, 500, 'Login failed', err.message);
  }
};

exports.forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, 'Email is required');

    const user = await userService.getuserByEmail(email);
    if (!user) return sendError(res, 404, 'User not found');

    const id = user.id;
    const getToken = await userService.getToken(id);
    if (getToken) return sendError(res, 429, 'A token has already been created within the last 15 mins');
  
    const { token, expiresAt } = await generateToken();
    const hashedToken = await bcrypt.hash(token, 10);
    const save = await userService.saveToken({ hashedToken, expiresAt, id });

    let new_token = token + "/" + id;

    return sendSuccess(res, 200, { token: new_token }, 'Add the token to your URL');
  
  } catch (err) {
    return sendError(res, 500, 'Server error', err.message);
  }
};

exports.reset_password = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return sendError(res, 400, 'New password is required');

    const token = req.params.token;
    const id = req.params.id;
    const savedToken = await userService.getToken(id);
    if (!savedToken) return sendError(res, 400, 'expired or invalid token');

    const hashed_token = savedToken.token;
    const tokenMatch = await bcrypt.compare(token, hashed_token);
    if (!tokenMatch) return sendError(res, 400, 'invalid or expired token');

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await userService.updatePassword(savedToken.user_id, hashed_password);

    return sendSuccess(res, 200, {user: user}, 'Password has been updated successfully!');
  } catch (err) {
    return sendError(res, 500, 'Failed to reset password', err.message);
  }
};

exports.verify_email = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return sendError(res, 400, 'otp is required!');

    const id = req.params.id;

    const savedOTP = await userService.getOTP(id);
    if (!savedOTP) return sendError(res, 400, 'expired or invalid otp');

    const hashedOTP = savedOTP.otp;
    const otpMatch = await bcrypt.compare(otp, hashedOTP);
    if (!otpMatch) return sendError(res, 400, 'invalid or expired otp');

    const verify = await userService.verifyEmail(id);

    return sendSuccess(res, 200, { user: verify }, 'Email has been verified successfully!')
  } catch (err) {
    return sendError(res, 500, 'Failed to verify email', err.message);
  };

};

exports.resend_otp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, 'Email is required');

    const user = await userService.getuserByEmail(email);
    if (!user) return sendError(res, 404, 'User not found');

    const id = user.id;
    const getOTP = await userService.getOTP(id);
    if (getOTP) return sendError(res, 429, 'An otp has already been sent within the last 5 mins');

    const { otp, expiresAt } = await generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const save = await userService.saveOTP({ hashedOTP, expiresAt, id });

    return sendSuccess(res, 200, { otp, user }, 'OTP has been successfully generated!');
  } catch (err) {
    return sendError(res, 500, 'Could not resend an otp', err.message);
  }
}

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