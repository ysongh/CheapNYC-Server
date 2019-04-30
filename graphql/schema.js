const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type Item{
            _id: ID!
            name: String!
            category: String!
            price: Int!
            company: String!
            location: String!
            city: String!
            description: String!
            image: String
            image_id: String
            date: String!
            author: String!
        }
        type User{
            _id: ID!
            name: String!
            email: String
            password: String
            image: String
            date: String!
            title: String
            point: Int!
            favorites: [Favorite!]!
        }
        type Favorite{
            _id: ID!
            name: String!
        }
        type Query {
            items: [Item!]!
            itemsByFilter(category: String!, city: String!, price1: Int!, price2: Int!): [Item!]!
            users: [User!]!
            userById(id: ID!): User! 
        }
        schema {
            query: Query 
        }
    `
); 