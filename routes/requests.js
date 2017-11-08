var download = require('./../libs/download');



module.exports = function(app) {

  app.get('/requests', async function(req, res) {
    const title = 'Запросы';
    const list = await download.getRequestsList();

    res.render('requests', {
      title,
      requests: list
    });
  });

}