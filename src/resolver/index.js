const _ = require("lodash");

const users = require("./users");
const company = require("./company");

module.exports = _.merge(users, company);
