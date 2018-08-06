const http = require("http");
const app = require("./app.js");

const testPort = 5000;

var port = process.env.PORT || testPort;
const server = http.createServer(app);

server.listen(port, ret => {
  console.log(`Express: port ${port} is listening...`);
});
