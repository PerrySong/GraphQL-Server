var USER_PROTO_PATH = __dirname + '/proto/user.proto';
var AUTH_PROTO_PATH = __dirname + "/proto/auth.proto";

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
const grpc_promise = require('grpc-promise');

const GetGithubInfo = (id) => {
  var packageDefinition = protoLoader.loadSync(
    USER_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
  
  var user_proto = grpc.loadPackageDefinition(packageDefinition).user;
  var client = new user_proto.UserService('localhost:8090', grpc.credentials.createInsecure())
  // TODO let user;
  grpc_promise.promisifyAll(client);
  return client.GetGithubInfo().sendMessage({id: id})
}

const GetGithubRepos = (id) => {
  var packageDefinition = protoLoader.loadSync(
    USER_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
  
  var user_proto = grpc.loadPackageDefinition(packageDefinition).user;
  var client = new user_proto.UserService('localhost:8090', grpc.credentials.createInsecure())
  // TODO let user;
  grpc_promise.promisifyAll(client);
  return client.GetGithubRepos().sendMessage({id: id})
}

const SignUp = (email, password, firstname, lastname) => {
  var packageDefinition = protoLoader.loadSync(
    AUTH_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
  var auth_proto = grpc.loadPackageDefinition(packageDefinition).auth;
  console.log("Hererererererererererererer")
  var client = new auth_proto.AuthService('127.0.0.1:8070', grpc.credentials.createInsecure())
  grpc_promise.promisifyAll(client);
  return client.SignUp().sendMessage({Email: email, Password: password, Firstname: firstname, Lastname: lastname});
}

const LogIn = (email, password) => {
  console.log("gRPC client login")
  var packageDefinition = protoLoader.loadSync(
    AUTH_PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
  var auth_proto = grpc.loadPackageDefinition(packageDefinition).auth;
  var client = new auth_proto.AuthService('127.0.0.1:8070', grpc.credentials.createInsecure())
  grpc_promise.promisifyAll(client);
  return client.LogIn().sendMessage({Email: email, Password: password});
}


module.exports = {
  GetGithubInfo,
  GetGithubRepos,
  LogIn,
  SignUp
}