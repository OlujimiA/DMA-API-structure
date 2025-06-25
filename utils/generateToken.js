const crypto = require('crypto');

function generateToken() {
  const token = crypto.randomBytes(32).toString('hex'); // raw token to send via email
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex'); // store this in DB

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  return { token, hashedToken, expiresAt };
};

module.exports = {
    generateToken,
};