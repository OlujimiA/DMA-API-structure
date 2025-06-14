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

