var parseUrl = require('url').parse;

module.exports = function (app) {
  app.seeds = app.conf.seeds.map(function (seed) {
    var parts = seed.split(':');
    return { host: parts[0], port: parts[1] || app.conf.bind_port };
  });
  console.log('seeds', app.seeds);
}