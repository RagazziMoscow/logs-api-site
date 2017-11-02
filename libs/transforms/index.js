var async = require('async');
var core = require('./core');
var users = require('./users');


function getActiveVisits(visitsList, activeIDs) {
  return visitsList.filter((visit) => {
    return activeIDs.includes(visit.clientID);
  });
}


function getActiveHits(hitsList, activeIDs) {
  return hitsList.filter((hit) => {
    return activeIDs.includes(hit.clientID);
  });
}


module.exports = {
  getUsersIDsList: function(visitsList) {
    const IDsList = visitsList.map((visit) => {
      return visit.clientID;
    });
    return IDsList;
  },
  getActiveUsers: function(usersIDsList, activeCount) {
    // const groupedIDsList = core.groupUsersByVisitCount(usersIDsList); // сгруппированный массив
    // const sortedIDsList = core.sortUsersByVisitCount(groupedIDsList); // отсортированный в обр-м порядке
    // const activeIDsCounts = sortedIDsList.slice(0, activeCount); // первые 20 пользователей
    // Заглушка
    const begin = Math.floor(Math.random() * (usersIDsList.length - activeCount));
    const end = begin + activeCount;
    const activeIDsCounts = usersIDsList.slice(begin, end);
    //console.log(activeIDsCounts);
    /*
    const activeIDs = activeIDsCounts.map((IDItem) => {
      const IDKey = Object.keys(IDItem)[0];
      return IDKey;
    }); // только ID первых activeCount активных юзеров
    */
    return activeIDsCounts;
  },
  getActiveUsersStatisticks: function(activeUsersIDsList, usersVisits, usersHits) {

    return new Promise((resolve, reject) => {

      // параллельно
      async.parallel([
        (callback) => {
          const activeVisits = getActiveVisits(usersVisits, activeUsersIDsList);
          callback(null, activeVisits);
        },
        (callback) => {
          const activeHits = getActiveHits(usersHits, activeUsersIDsList);
          callback(null, activeHits);
        }
      ], (err, results) => {

        if (err) reject(err);
        const activeVisits = results[0];
        const activeHits = results[1];
        const logsData = activeUsersIDsList.map((ID) => {

          const usersDates = users.getDatesForUser(activeVisits, ID);
          /*Дата первого раза...*/
          const userWatches = users.getWatchesForUser(activeHits, ID);
          const userData = {
            id: ID,
            dates: usersDates,
            watches: userWatches
          };

          return userData;
        });
        resolve(logsData);
      });
    });
  }
};