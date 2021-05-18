var crypto = require("crypto");

function md5Hash(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

module.exports = { md5Hash };
