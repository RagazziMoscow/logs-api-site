module.exports = function(app) {

  var logs = require('./logs')(app);
  var requests = require('./requests')(app);

  app.get('/', async function(req, res, next) {
    res.render('report', {
      title: 'Логи'
    });
  });

}