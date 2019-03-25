const gRPCClient = require(__dirname + '/../gRPCClient/client')
const jwtsecret = require('../config.json')
var jwt = require('jsonwebtoken');
const { UserInputError, ForbiddenError } = require('apollo-server');

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

const login = ({ email, password }) => {
    if(email === '' || password === '') {
        console.log("ERROR")
        throw new UserInputError('Form Arguments invalid');
    }
    var user = users.find(u => {
        if (u.email === email) {
            return u;
        }
    });
    console.log("user " + user.email);
    if(user !== undefined || user.password === password) {
        users[user.id].jwt.Jwt = jwt + dummyCount;
        var to = { Jwt: jwt + dummyCount };
        console.log(to);
        dummyCount++;
        return to;
        // return Promise.resolve(to);
    } else {
        console.log("ERROR 2")
        throw new UserInputError('Form Arguments invalid');
    }
}

// For testing purposes. Use the function below this to do the actual mutation
const signup = ({ firstname, lastname, email, password }) => {
    var userCheck = users.find(u => {
        if (u.email === email) {
            return u;
        }
    });
    if(userCheck !== undefined && userCheck !== null && userCheck.email === email) {
        throw new UserInputError('Email already exists');
    }
    var newId = users.length > 0 ? users[users.length - 1].id + 1 : 0;
    dummyCount++;
    users = [...users, {
        id: newId,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        jwt: {
            Jwt: jwt + dummyCount    // testing dummy token
        }
    }];
    // return Promise.resolve(users[users.length-1]);

    profiles = [...profiles, {
        id: newId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        title: "Hello there!",
        location: "Earth",
    }];
    to = users[newId].jwt
    // console.log(to);
    return Promise.resolve(to);
    // return Promise.resolve(profiles[profiles.length - 1]);
}

// <<<<<<< perry
const getGitHubUser = (Jwt) => {
    try {
        console.log(jwtsecret.jwtsecret)
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
        console.log(jwtsecret.jwtsecret)
        let decoded = jwt.verify(Jwt, jwtsecret.jwtsecret, { algorithm: 'RS256'});
        let id = decoded.id
        const repos = gRPCClient.GetGithubRepos(id)
        return repos
    } catch(err) {
        return Promise.resolve(err)
    }
}

// =======
// var gitHubProfiles = [
//     {
//         id: 0,
//         username: "Teean Ronson",
//         avatar_url: "https://media.licdn.com/dms/image/C5603AQEzDobK9kQ_ow/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=ADTJOYvDlT5mTl3Ncz97-bwDAVJE4FXwykRh0RDOt60",
//         html_url: "https://github.com/TeeanRonson",
//         email: "email@gmail.com",
//         location: "San Francisco",
//         bio: "Welcome to Showcase! This is my bio. Here I will talk to you about nothing. Yes, you read that right. Nothing. The concept of nothing. There is nothing to talk about here because we are talking about nothing. Is there really nothing to talk about if we are talking about talking about nothing? Will we then be talking about something? Who knows.",
//         company: "Showcase",
//         repos_url: "https://github.com/TeeanRonson?tab=repositories",
//         public_repos: 27,
//     },
//     {
//         id: 1,
//         username: "Perry Song",
//         avatar_url: "https://avatars2.githubusercontent.com/u/26971233?v=4", 
//         html_url: "https://github.com/PerrySong",
//         email: "psong4@dons.usfca.edu",
//         location: "San Francisco",
//         bio: "Smelly code, smelly code, what are they feeding you. Smelly code, smelly code, it's not your fault! Smelly code, smelly code, what are they feeding you. Smelly code, smelly code, it's not your fault! Smelly code, smelly code, what are they feeding you. Smelly code, smelly code, it's not your fault!",
//         company: "Showcase",
//         repos_url: "https://github.com/PerrySong?tab=repositories",
//         public_repos: 42,
//     },
//     {
//         id: 2,
//         username: "Drew Noma",
//         avatar_url: "https://avatars2.githubusercontent.com/u/26971233?v=4", 
//         html_url: "https://github.com/dknoma",
//         email: "dknoma@dons.usfca.edu",
//         location: "San Francisco",
//         bio: "You found me!",
//         company: "Showcase",
//         repos_url: "https://github.com/dknoma?tab=repositories",
//         public_repos: 21,
//     },
// ]

// const getGitHubInfo = ({ id }) => {
//     const user = gitHubProfiles.find(u => u.id === id);
//     console.log("user: " + user);
//     if(user === undefined || user === null) {
//         throw new ForbiddenError('Form Arguments invalid');
//     }
//     return user;
// }

// For testing purposes. Use the function below this to do the actual mutation
// const signup = ({ firstname, lastname, email, password }) => {
//     const jwt = gRPCClient.SignUp(email, password, firstname, lastname)
//     jwt.then(jwt => console.log(jwt))
//     return jwt
// }

// const login = ({ email, password }) => {
//     const jwt = gRPCClient.LogIn(email, password)
//     jwt.then(jwt => console.log(jwt))
//     return jwt
// }

// const getGitHubInfo = (id) => {
//     const user = gRPCClient.GetGithubInfo(id)
//     // console.log("what", user)
//     // const res = Promise.resolve(user)
//     // console.log("res = " + res)
//     return user;
// }


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
        getUser: (_, { jwt }, __, ___) => {
            if(jwt === '') {
                return;
            }
            var user = users.find(u => {
                if (u.jwt.Jwt === jwt) {
                    return u;
                }
            });
            var profile = profiles.find(p => p.id === user.id);
            return profile;
        },
        getUsers: (_, args, __, ___) => getAllUsers(),
// <<<<<<< perry
        getGitHubUser: (_, { Jwt }, __, ___) => getGitHubUser(Jwt),
        getGitHubRepos: (_, { Jwt }, __, ___) => getGitHubRepos(Jwt),
// =======
//         getGitHubUser: (_, { id }, __, ___) => getGitHubInfo({ id: id }),
// >>>>>>> master
    },
    Mutation: {
        // userInputError: (parent, args, context, info) => {
        //     if(args.input !== 'expected') {
        //         throw new UserInputError('Form Arguments invalid', {
        //             invalidArgS: Object.keys(args),
        //         });
        //     }
        // },
        // Same as above: get these variables from the args param
        signup: (_, { firstname, lastname, email, password }, __, ___) => signup({
            firstname: firstname, lastname: lastname, email: email, password: password
        }),
        login: (_, { email, password }, __, ___) => login({
            email: email, password: password
        })
    },
};