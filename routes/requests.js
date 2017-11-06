var download = require('./../libs/download');



module.exports = function(app) {

  app.get('/requests', async function(req, res) {
    const title = 'Запросы';
    let reqList;

    try {
      const list = await download.getRequestsList();
      reqList = list;

    } catch (err) {
      reqList = [];
    }

    res.render('requests', {
      title,
      requests: reqList
    });
  });

}