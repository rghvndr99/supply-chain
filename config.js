//const env = process.env;

const nodeEnv = "local";

const dbName = "Retail";
const dbHost = "127.0.0.1";
const dbPort = "27017";
const port = 8080;
const host = "localhost"; //'127.0.0.1';
const salt_rounds = 12;
const api = {
  product: "product",
  login: "login",
  loginFB: "loginFB",
  loginGH: "loginGH",
  editUserClt: "edituserClt",
  editProductClt: "editProductClt",
  requestClt: "editRequestClt"
};
const collections = {
  user: "userMap",
  requests: "requestMap",
  product: "userProductMap"
};

let mongoConnectUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
let serverConnectURL = `http://${host}:${port}/`;

export default {
  mongodbUri: mongoConnectUri,
  port,
  host,
  env: nodeEnv,
  collections,
  salt_rounds,
  api,
  dbName,
  serverConnectURL
};
