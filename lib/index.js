var axon = require('axon');

module.exports = function (app) {
  require('./seeds')(app);

  app.on('ready', function () {
    app.inc = axon.socket('sub-emitter');
    if (app.conf.is_server) {
      app.inc.on('connection', function () {
        console.log('hey, got a new connection!');
      });
      app.inc.bind(app.conf.bind_port);
    }
    else {
      app.inc = axon.socket('sub-emitter');
      app.inc.on('broadcast', function () {
        console.log('hey, got a server broadcast!');
      });
      app.inc.connect(app.seeds[0].port, app.seeds[0].host);
    }

    app.out = axon.socket('pub-emitter');
    if (app.conf.is_server) {
      app.out.bind(app.conf.bind_port + 1);
    }
    else {
      app.out.connect(app.seeds[0].port + 1, app.seeds[0].host);
    }

    setInterval(function () {
      var msg = 'now ' + Math.random();
      console.log('sending', msg);
      if (app.conf.is_server) app.out.send('broadcast', msg);
      else app.out.send('connection', msg);
    }, 2000);
  });
};
