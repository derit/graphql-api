 
const rootTypes = require("./rootTypes")
const interfaces = require("./interfaces")
const PageInfo = require("./PageInfo")
const users = require("./users") 
const company = require("./company") 

module.exports = [
  rootTypes,
  interfaces,
  PageInfo, 
  ...users, 
  ...company, 
]
