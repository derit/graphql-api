const jwt = require("jsonwebtoken");

const key = process.env.JWT_KEY;

async function isValidJwt(token) {
  const encodedToken = token || null;
  if (encodedToken === null) {
    return false;
  }
  try {
    await auth().verifyIdToken(encodedToken);
    return true;
  } catch (err) {
    return false;
  }
}

function generateToken(data) {
  return jwt.sign(data, key);
}

async function decodeToken(token) {
  try {
    const decode = await jwt.verify(token, key);
    return decode;
  } catch (error) {
    throw Error(error);
  }
}

module.exports = {
  isValidJwt,
  generateToken,
  decodeToken,
};
