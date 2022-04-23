var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Testing Node.js...');
}).listen(3000, "127.0.0.1");
console.log('Server is running at http://127.0.0.1:5001/');
