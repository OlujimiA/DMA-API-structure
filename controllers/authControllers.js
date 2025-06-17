const jwt = require('jsonwebtoken');
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


exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh token verification error:', err.message);
    return res.status(403).json({ message: 'Invalid or expired refresh token', error: err.message });
  }
};
