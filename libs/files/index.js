const path = require('path');
const chalk = require('chalk');

var fs = require('fs');
var async = require('async');

module.exports = {
  readLogs: function(logsFolder) {
    return new Promise((resolve, reject) => {
      //console.log(path.);
      async.parallel([
        (callback) => {
          fs.readFile(path.join(logsFolder, 'visits.txt'), 'utf8', (err, data) => {
            if (err) reject(err);
            callback(null, JSON.parse(data));
          });
        },
        (callback) => {
          fs.readFile(path.join(logsFolder, 'hits.txt'), 'utf8', (err, data) => {
            if (err) reject(err);
            callback(null, JSON.parse(data));
          });
        }
      ], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  writeLogs: function(logsFolder, usersVisits, usersHits) {
    return new Promise((resolve, reject) => {
      async.parallel([
        (callback) => {
          fs.writeFile(path.join(logsFolder, 'visits.txt'), JSON.stringify(usersVisits), (err) => {
            if (err) reject(err);
            console.log(chalk.red('Визиты записаны...'));
          });
          callback(null);
        },
        (callback) => {
          fs.writeFile(path.join(logsFolder, 'hits.txt'), JSON.stringify(usersHits), (err) => {
            if (err) reject(err);
            console.log(chalk.red('Просмотры записаны...'));
          });
          callback(null);
        }
      ], (err, res) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
  logsExist: function(logsFolder) {
    return new Promise((resolve, reject) => {
      async.parallel([
        (callback) => {
          fs.exists(path.join(logsFolder, 'visits.txt'), (exists) => {
            callback(null, exists);
          });
        },
        (callback) => {
          fs.exists(path.join(logsFolder, 'hits.txt'), (exists) => {
            callback(null, exists);
          });
        }
      ], (err, results) => {
        if (err) reject(err);
        resolve(results[0] && results[1]);
      });
    });
  },
  removeLogs: function(logsFolder) {
    return new Promise((resolve, reject) => {
      async.parallel([
        (callback) => {
          fs.unlink(path.join(logsFolder, 'visits.txt'), (err) => {
            if (err) reject(err);
            callback(null);
          });
        },
        (callback) => {
          fs.unlink(path.join(logsFolder, 'hits.txt'), (err) => {
            if (err) reject(err);
            callback(null);
          });
        }
      ], (err, results) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}