const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type User{
            _id: ID!
            name: String!
            email: String
            password: String
            image: String
            date: String!
        }
        type Query {
            users: [User!]!
        }
        schema {
            query: Query 
        }
    `
); 