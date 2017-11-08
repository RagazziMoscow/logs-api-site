var async = require('async');

var core = require('./core');

module.exports = {
  getData: function(visitsReqID, hitsReqID) {
    return new Promise((resolve, reject) => {
      async.parallel([
        (callback) => {
          const visits = core.getVisits(visitsReqID)
            .then((visits) => {
              callback(null, visits);
            }, (error) => {
              callback(error);
            });
        },
        (callback) => {
          const hits = core.getHits(hitsReqID)
            .then((hits) => {
              callback(null, hits);
            }, (error) => {
              callback(error);
            });
        }
      ], (err, results) => {
        if (err) console.log(err);
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  getRequestsList: async function() {
    const requestsList = await core.getRequestsList();
    return requestsList;
  },
  getRequestsIDs: async function() {
    const IDsList = await core.getRequestsIDs();
    return IDsList;
  }
}