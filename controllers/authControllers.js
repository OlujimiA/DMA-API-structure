const bcrypt = require('bcrypt');
const authService = require('../services/authServices');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const result = await authService.loginUser(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ token: result.token, user: result.user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, role, password } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required - email, role, and password' });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newUser = await authService.signup({
      email,
      role,
      password: hashed_password,
    });

    res.status(201).json({ message: 'User created successfully', User: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Could not create User', error: err.message });
  }
};

