var express = require('express');
var app = express();
var engine = require('ejs-locals');

const port = process.env.PORT || 8000;
const path = require('path');
const chalk = require('chalk');


var requests = require('./libs/requests');
var transforms = require('./libs/transforms');
var async = require('async')

const activeUsersCount = 20;


app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {

  //параллельно
  async.parallel([
    (callback) => {
      requests.getVisits(294174)
        .then((visits) => {
          //console.log(visits);
          callback(null, visits);
        }, (error) => {
          console.log(error);
        });
      //console.log(visits);
    },
    (callback) => {
      requests.getHits(294258)
        .then((hits) => {
          //console.log(hits);
          callback(null, hits);
        }, (error) => {
          console.log(error);
        });
    }

  ], async(err, results) => {
    if (err) console.log(err);
    if (!err) console.log('Обработка начата...');

    const usersVisits = results[0]; // визиты
    const usersHits = results[1]; // просмотры

    const usersIDs = transforms.getUsersIDsList(results[0]); // ID всех пользователей
    const activeUsersIDs = transforms.getActiveUsers(usersIDs, activeUsersCount); // ID активных пользователей


    const report = await transforms.getActiveUsersStatisticks(activeUsersIDs, usersVisits, usersHits);
    console.log(report);
    res.render('report', {
      data: report
    });

  });

});



app.listen(port, () => {
  console.log(chalk.yellow(`Сервер работает на порту ${port}...`));
});