const _ = require("lodash")

const mutations = require("./mutations")
const queries = require("./queries")

module.exports = _.merge(mutations, queries)
