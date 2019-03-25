const { gql } = require("apollo-server");
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
// Use id: Int! when testing non mutation data. if adding data w/ Mutation, then use ID!
exports.typeDefs = gql `
type Query {
   getProfile(id: Int!): Profile
   getProfileList: [Profile]   # "[]" means this is a list of profiles
   getUser(jwt: String): Profile
   getUsers: [User]
   getGitHubUser(id: Int!): GitHubUser
   getGithubProfile: GithubProfile
}

type Mutation {
    signup(firstname: String!, lastname: String!, email: String!, password: String!): Jwt
    login(email: String!, password: String!): Jwt
    userInputError(input: String): String
}

type Jwt {
    Jwt: String!
}

type Owner {
    avatar_url: String!
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
   title: String
   location: String
}

type User {
    id: Int!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    jwt: Jwt
}

# Perry edited March 17th
type GitHubUser {
    id: Int!
    username: String!
    html_url: String!
    avatar_url: String!
    bio: String
    company: String
    email: String
    location: String
    repos_url: String!
    public_repos: Int!
}
`;