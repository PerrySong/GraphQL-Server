const gRPCClient = require(__dirname + '/../gRPCClient/client')
const jwtsecret = require('../config.json')
var jwt = require('jsonwebtoken');
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
// TESTING DUMMY USERS
/*
Use id: Int! when testing non mutation data. if adding Mutation data w/ ID, then use ID!
query getProfile($id: Int!) {
    getProfile(id:$id) {
        id
        firstname
        lastname
        email
    }
}
*/


var profiles = [
    // {
    //     id: 1,
    //     firstname: 'bob',
    //     lastname: 'bobberson',
    //     email: 'bobberson@bob.bob',
    // },
    // {
    //     id: 2,
    //     firstname: 'Hemjryu',
    //     lastname: 'Dlong',
    //     email: 'hdlong@bob.bob',
    // },
];

var users = [
    // {
    //     id: 1,
    //     firstname: 'bob',
    //     lastname: 'bobberson',
    //     email: 'bobberson@bob.bob',
    //     password: 'bobby',
    // },
    // {
    //     id: 2,
    //     firstname: 'Hemjryu',
    //     lastname: 'Dlong',
    //     email: 'hdlong@bob.bob',
    //     password: 'bobby',
    // },
];

const getProfileById = ({ id }) => {
    return Promise.resolve(profiles.find(p => p.id === id));
}

// For testing purposes. Use the function below this to do the actual mutation
const signup = ({ firstname, lastname, email, password }) => {
    const jwt = gRPCClient.SignUp(email, password, firstname, lastname)
    jwt.then(jwt => console.log(jwt))
    return jwt
}

const login = ({ email, password }) => {
    const jwt = gRPCClient.LogIn(email, password)
    jwt.then(jwt => console.log(jwt))
    return jwt
}

const getGitHubUser = (Jwt) => {
    try {
        // console.log(jwtsecret.jwtsecret)
        let decoded = jwt.verify(Jwt, jwtsecret.jwtsecret, { algorithm: 'RS256'});
        let id = decoded.id
        const user = gRPCClient.GetGithubInfo(id)
        return user
    } catch(err) {
        return Promise.resolve(err)
    }
}

const getGitHubRepos = (Jwt) => {
    try {
        let decoded = jwt.verify(Jwt, jwtsecret.jwtsecret, { algorithm: 'RS256'});
        let id = decoded.id
        const repos = gRPCClient.GetGithubRepos(id)

        // console.log(repos)
        return repos
    } catch(err) {
        return Promise.resolve(err)
    }
}

getProgrammingLanguages = (Jwt) => {
    console.log("Herer!!!!")
    try {
        let decoded = jwt.verify(Jwt, jwtsecret.jwtsecret, { algorithm: 'RS256'});
        let id = decoded.id
        const languages = gRPCClient.getProgrammingLanguages(id)
        return languages
    } catch(err) {
        return Promise.resolve(err)
    }
}


//// For production
// const signup = ({ firstname, lastname, email, password }) => {
//     const userAction = async() => {
//         const response = await fetch('http://localhost:8000/signup', {
//             method: 'POST',
//             body: `{"email":"` + email + `", "password":"` + password + `", "firstname":"` + firstname + `", lasttname":"` + lastname + `"}`, // string or object
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const myJson = await response.json(); //extract JSON from the http response
//         // do something with myJson, will return a json contain id
//     }
// }

const getAllUsers = () => {
    return Promise.resolve(users);
}

//
// Export the resolvers here
// Query and Mutation format: 
//
//      <query/mutation name in schema>: (parent, args, context, info) { <local promise function>({params}) }
//
exports.resolvers = {
    Query: {
        getProfileList: () => profiles,
        // normally use obj, args, context, info, but most of those params are unneeded right now
        // getProfile: (parent, args, users, __) => {args.id},    
        //      Define which param you want from the args: in our case its "id"
        getProfile: (_, { id }, __, ___) => getProfileById({ id: id }),
        getUsers: (_, args, __, ___) => getAllUsers(),
        getGitHubUser: (_, { Jwt }, __, ___) => getGitHubUser(Jwt),
        getGitHubRepos: (_, { Jwt }, __, ___) => getGitHubRepos(Jwt),
        getProgrammingLanguages: (_, { Jwt }, __, ___) => getGitHubRepos(Jwt),
    },
    Mutation: {
        // Same as above: get these variables from the args param
        signup: (_, { firstname, lastname, email, password }, __, ___) => signup({
            firstname: firstname, lastname: lastname, email: email, password: password
        }),

        login: (_, { email, password }, __, ___) => login({
            email: email, password: password
        })
    },
};