var EE = require('events').EventEmitter;
var app = module.exports = new EE;
app.setMaxListeners(0);
app.root = __dirname;
app.conf = require('./config.json');
module.exports = app;

app.on('boot', function () {
  require('./lib/index')(app);
  app.emit('ready');
});
