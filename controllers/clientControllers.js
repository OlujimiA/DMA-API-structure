const bcrypt = require('bcrypt');
const clientService = require('../services/clientServices.js');
const generateToken = require('../utils/generateToken');
const generateOTP = require('../utils/generateOTP');

exports.getAllclients = async (req, res) => {
  try {
    const clients = await clientService.getAllclients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch clients', error: err.message });
  }
};

exports.getclientById = async (req, res) => {
  try {
    const client = await clientService.getclientById(req.params.id);
    if (!client) return res.status(404).json({ message: 'client not found' });
    res.json(client);

  } catch (err){
    res.status(500).json({message: 'Server error', error: err.message });
  }
  
};

exports.createClient = async (req, res) => {
  try {
    const { name, email, tel, country, address, category, password } = req.body;

    if (!name || !email || !tel || !country || !address || !category || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, country, address, category, password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newClient = await clientService.createClient({
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
    const id = newClient.id;
    const save = await clientService.saveOTP({ hashedOTP, expiresAt, id });

    res.status(201).json({ message: 'Client created successfully', Client: newClient, OTP: otp });
  } catch (err) {
    res.status(500).json({ message: 'Could not create Client', error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { name, email, tel, country, address, category, password } = req.body;
    const { id } = req.params;

    if (!name || !email || !tel || !country || !address || !category || !password) {
      return res.status(400).json({ message: 'All fields are required - name, email, tel, country, address, category, password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const updated = await clientService.updateClient(id, { name, email, tel, country, address, category, password: hashed_password });

    if (!updated) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client updated successfully', client: updated });
  } catch (err) {
    res.status(500).json({ message: 'Could not update client', error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await clientService.deleteClient(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'client deleted successfully', client: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete client', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const result = await clientService.login(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = result.tokens

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ AccessToken: accessToken, user: result.user });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const client = await clientService.getclientByEmail(email);
    if (!client) return res.status(404).json({ message: 'client not found' });

    const id = client.id;
    const getToken = await clientService.getToken(id);
    if (getToken) return res.status(403).json({ message:  'A token has already been created within the last 15 mins' });
  
    const { token, expiresAt } = await generateToken();
    const hashedToken = await bcrypt.hash(token, 10);
    const save = await clientService.saveToken({ hashedToken, expiresAt, id });

    let new_token = token + "/" + id;

    res.status(200).json({ message: 'Add the token to your URL', token: new_token});
  
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message });
  }
};

exports.reset_password = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(403).json({ message: 'password is required' });

    const token = req.params.token;
    const id = req.params.id;
    const savedToken = await clientService.getToken(id);
    if (!savedToken) return res.status(403).json({ message: 'expired or invalid token' });

    const hashed_token = savedToken.token;
    const tokenMatch = await bcrypt.compare(token, hashed_token);
    if (!tokenMatch) return res.status(403).json({ message: 'invalid or expired token' });

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await clientService.updatePassword(savedToken.user_id, hashed_password);

    res.status(200).json({ message: 'Password has been updated successfully!', client: user});
  } catch (err) {
    res.status(500).json({ message: 'Failed to reset password', error: err.message });
  }
};

exports.verify_email = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(403).json({ message: 'otp is required!'});

    const id = req.params.id;

    const savedOTP = await clientService.getOTP(id);
    if (!savedOTP) return res.status(403).json({ message: 'expired or invalid otp' });

    const hashedOTP = savedOTP.otp;
    const otpMatch = await bcrypt.compare(otp, hashedOTP);
    if (!otpMatch) return res.status(403).json({ message: 'invalid or expired token' });

    const verify = await clientService.verifyEmail(id);

    res.status(200).json({ message: 'Email has been verified successfully!', client: verify})
  } catch (err) {
    res.status(500).json({ message: "Failed to verify email", Error: err.message});
  };

};

exports.resend_otp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const client = await clientService.getclientByEmail(email);
    if (!client) return res.status(404).json({ message: 'client not found' });

    const id = client.id;
    const getOTP = await clientService.getOTP(id);
    if (getOTP) return res.status(403).json({ message:  'An otp has already been sent within the last 5 mins' });

    const { otp, expiresAt } = await generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const save = await clientService.saveOTP({ hashedOTP, expiresAt, id });

    res.status(201).json({ message: 'OTP has been successfully generated!', OTP: otp, Client: client});
  } catch (err) {
    res.status(500).json({ message: 'Could not resend an otp', Error: err.message});
  }
}

exports.profile = async (req, res) => {
  try {
    const id = req.params.id;
    const { pfp_url, doc_url, business_status } = req.body;
    if (!pfp_url || !doc_url || !business_status) {
      return res.status(400).json({ message: 'All fields are required - pfp_url, doc_url, business_status'});
    }

    const profile = await clientService.profile(id, { pfp_url, doc_url, business_status});
    if (!profile) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client profile has been successfully completed!', Client: profile})
  } catch (err) {
    res.status(500).json({ message: 'Could not complete client profile', Error: err.message });
  }
};