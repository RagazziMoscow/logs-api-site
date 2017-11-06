var requests = require('./../libs/requests');



module.exports = function(app) {

  app.get('/requests', async function(req, res) {
    const reqList = await requests.getRequestsList();
    res.render('requests', {
      title: 'Запросы',
      requests: reqList
    });
  });

}