var express = require('express');
var app = express();
var engine = require('ejs-locals');
var fs = require('fs');

const port = process.env.PORT || 8000;
const logsFolder = 'logs';
const path = require('path');
const chalk = require('chalk');


var requests = require('./libs/requests');
var transforms = require('./libs/transforms');
var async = require('async')

const activeUsersCount = 20;
const visitsReqID = 295866;
const hitsReqID = 295878;


app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function(req, res, next) {

  const logsData = await requests.getData(visitsReqID, hitsReqID);
  console.log('Обработка начата...');

  const usersVisits = logsData[0]; // визиты
  const usersHits = logsData[1]; // просмотры

  fs.writeFile(path.join(logsFolder, 'visits.txt'), JSON.stringify(usersVisits), () => {
    console.log('visits are writen...');
  });

  fs.writeFile(path.join(logsFolder, 'hits.txt'), JSON.stringify(usersHits), () => {
    console.log('hits are writen...');
  });

  const usersIDs = transforms.getUsersIDsList(usersVisits); // ID всех пользователей
  const activeUsersIDs = transforms.getActiveUsers(usersIDs, activeUsersCount); // ID активных пользователей
  const report = await transforms.getActiveUsersStatisticks(activeUsersIDs, usersVisits, usersHits); // отчёт
  //console.log(report);

  res.render('report', {
    data: report
  });

});



app.listen(port, () => {
  console.log(chalk.yellow(`Сервер работает на порту ${port}...`));
});