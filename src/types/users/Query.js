module.exports = `
   


extend type Query {
    getUser(usertoken:String!):User!   
    getUsers:[User]!   
  }
`;
