module.exports = `

type Company{
    _id:ID!
    name:String
    creationDate:Date 
    users:[User] 
}
 
extend type Query {
    getCompanyById(id:String!):Company!   
    getCompanies:[Company]!   
  }

`
