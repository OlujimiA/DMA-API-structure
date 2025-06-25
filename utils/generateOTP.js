const crypto = require('crypto');

const generateOTP = async () => {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += crypto.randomInt(0, 10);
  }
  return otp;
};

module.exports = generateOTP;