require("dotenv").config();
const http = require("http");
const app = require("./app.js");

const testPort = 5001;

var port = process.env.PORT || testPort;
const server = http.createServer(app);
var ip = process.env.SERVER_PRIVATE_URL
  ? process.env.SERVER_PRIVATE_URL
  : "127.0.0.1";
server.listen(port, ip, ret => {
  console.log(`Express: Server ${ip}:${port} is listening...`);
});
