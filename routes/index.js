const logsFolder = './logs';

const path = require('path');
const chalk = require('chalk');


var requests = require('./../libs/requests');
var transforms = require('./../libs/transforms');
var files = require('./../libs/files');

module.exports = function(app) {
  app.get('/', async function(req, res, next) {
    res.render('report', {
      title: 'Логи'
    });
  });


  app.get('/requests', async function(req, res) {
    const reqList = await requests.getRequestsList();
    //console.log(reqList);
    res.render('requests', {
      title: 'Запросы',
      requests: reqList
    });
  });



  app.get('/checkLogs', async function(req, res) {
    const logsExist = await files.logsExist(logsFolder);
    //console.log(logsExist);
    res.json({
      logsExist
    });
  });

  app.get('/download', async function(req, res, next) {
    const IDs = await requests.getRequestsIDs();
    const visitsReqID = IDs[0];
    const hitsReqID = IDs[1];

    const logsData = await requests.getData(visitsReqID, hitsReqID); // Загрузка логов
    const usersVisits = logsData[0]; // Визиты
    const usersHits = logsData[1]; // Просмотры

    files.writeLogs(logsFolder, usersVisits, usersHits); // Запись логов
    console.log(chalk.red('Логи загружены...'));

    res.status(200).send('OK');
  });

  app.post('/print', async function(req, res, next) {
    let offsetCount = 0;
    let activeUsersCount = 20;
    if (req.body) {
      offsetCount = Number(req.body.offset)
      activeUsersCount = Number(req.body.activeCount);
    };

    const logsData = await files.readLogs(logsFolder); // чтение логов
    console.log(chalk.red('Обработка логов начата...'));

    const usersVisits = logsData[0]; // визиты
    const usersHits = logsData[1]; // просмотры

    const usersIDs = transforms.getUsersIDsList(usersVisits); // ID всех пользователей
    const activeUsersIDs = transforms.getActiveUsers(usersIDs, activeUsersCount, offsetCount); // ID активных пользователей
    const report = await transforms.getActiveUsersStatisticks(activeUsersIDs, usersVisits, usersHits); // отчёт
    console.log(chalk.red('Логи получены...'));

    res.json(report);
  });

  app.get('/removeLogs', async function(req, res) {
    const results = await files.removeLogs(logsFolder);
    res.status(200).send('OK');
  });
}