var request = require('request');

const AuthToken = require('./../../config').API.token;
const CounterID = require('./../../config').API.counterID;
const AuthHeader = {
  'Authorization': `OAuth ${AuthToken}`
};

function getVisits(requestID) {

  return new Promise((resolve, reject) => {

    const options = {
      url: `https://api-metrika.yandex.ru/management/v1/counter/${CounterID}/logrequest/${requestID}/part/0/download`,
      headers: AuthHeader
    };

    request(options, function(error, response, body) {
      if (body === undefined || error) reject('Error visits');

      console.log('Визиты получены...');

      const lines = body.split('\n').splice(1);
      const visitsList = lines.map((line, index) => {
        line = line.split('\t');
        let visit = {};

        visit.clientID = line[4];
        visit.date = line[1];
        visit.firstTimeDate = line[2];
        visit.duration = line[3];
        visit.hitIDs = line[0]
          .replace(']', '')
          .replace('[', '')
          .split(',');


        return visit;
      });

      resolve(visitsList);
    });
  });
}

function getHits(requestID) {
  return new Promise((resolve, reject) => {

    const options = {
      url: `https://api-metrika.yandex.ru/management/v1/counter/${CounterID}/logrequest/${requestID}/part/0/download`,
      headers: AuthHeader
    };

    request(options, function(error, response, body) {
      //console.log(response.statusCode);
      if (body === undefined || error) reject('Error hits');

      console.log('Просмотры получены...');

      const lines = body.split('\n').splice(1);
      let hitsList = lines.map((line, index) => {
        line = line.split('\t');
        hit = {
          hitID: line[0],
          clientID: line[2],
          title: line[1],
          url: line[3]
        };
        return hit;
      });
      hitsList = hitsList.filter((hit) => {
        return (hit.title != '');
      });
      resolve(hitsList);
    });
  });
}

function getRequestsList() {
  return new Promise((resolve, reject) => {

    const options = {
      url: `https://api-metrika.yandex.ru/management/v1/counter/${CounterID}/logrequests/`,
      headers: AuthHeader
    };

    request(options, function(error, response, body) {
      if (body === undefined || error) reject('Error requests');

      console.log('Запросы получены');

      const reqList = JSON.parse(body).requests.map((request) => {
        const newItem = {
          id: request.request_id,
          source: request.source,
          date1: request.date1,
          date2: request.date2
        };
        return newItem;
      });
      resolve(reqList);


    });
  });
}


module.exports.getRequestsList = getRequestsList;
module.exports.getVisits = getVisits;
module.exports.getHits = getHits;