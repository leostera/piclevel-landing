var fs = require('fs');
var path = require('path');
var connect = require('connect');

connect()
  .use(connect.logger('dev'))
  .use(function (req, res, next) {
    if(!fs.existsSync(path.join(__dirname, req.originalUrl))) {
      res.writeHead(200);
      fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    } else {
      next();
    }
  }.bind(this))
  .use(connect.static(__dirname))
  .use(function (req, res, next) {
    res.writeHead(200);
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  }.bind(this))
  .listen(9000);