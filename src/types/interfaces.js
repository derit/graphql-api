 module.exports = `
  interface INode {
    id: ID!
  }

  interface IPageInfo {
    endCursor: ID!
    hasNextPage: Boolean!
  }
`
