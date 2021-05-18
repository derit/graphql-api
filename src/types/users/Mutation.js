module.exports = `  
type LoginResult{
    token:String!
    userId:ID
}
extend type Mutation {
    addUser(firstname:String!,lastname:String!,birthday:Date!,company:String!,password:String!):User!
    loginUser(firstname:String!, password:String!):LoginResult 
}

`
