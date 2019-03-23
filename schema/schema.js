const { gql } = require("apollo-server");
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
// Use id: Int! when testing non mutation data. if adding data w/ Mutation, then use ID!
exports.typeDefs = gql `
type Query {
   getProfile(id: Int!): Profile
   getProfileList: [Profile]   # "[]" means this is a list of profiles
   getUsers: [User]
   getGithubProfile: GithubProfile
}

type Mutation {
    # signup(firstname: String!, lastname: String!, email: String!, password: String!): Profile
    signup(firstname: String!, lastname: String!, email: String!, password: String!): Profile
    login(email: String!, password: String!): Profile
}

type Owner {
    login: String!
    avatar_url: String!
    url: String!
    html_url: String!
    followers_url: String!
    following_url: String!
    starred_url: String!
    company: String
    location: String
    email: String!
    bio: String
}

type GithubProfile {
    id: Int!
    owner: Owner!
}

type Profile {
   id: Int!                # "!" denotes a required field
   firstname: String!
   lastname: String!
   email: String!
}

type User {
    id: Int!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
}
`;