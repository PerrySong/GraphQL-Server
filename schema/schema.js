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
   getGithubProfile: GithubProfile
   getGitHubUser(Jwt: String!): GitHubUser
   
   getProgrammingLanguages(Jwt: String!): Language
   getGitHubRepos(Jwt: String!): GitHubRepoList!
   hasGithubToken(Jwt: String!): HasToken
   getGitHubUserById(id: Int!): GitHubUser
}

type Mutation {
    signup(firstname: String!, lastname: String!, email: String!, password: String!): Jwt
    login(email: String!, password: String!): Jwt
    userInputError(input: String): String
}

type Jwt {
    Jwt: String!
}

type Language {
    language: [String!]
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

type GitHubRepo {
    git_tags_url: String!
    description: String
    private: Boolean!
    languages_url: String!
    stargazers_url: String!
    commits_url: String
    repo_created_at: String!
    repo_updated_at: String!
    home_page: String
    stargazers_count: Int!
    labels_url: String
    language: String
    watchers: Int
}
type GitHubRepoList {
    repos: [GitHubRepo!]
}

type HasToken {
    has_token: Boolean!
}

`;