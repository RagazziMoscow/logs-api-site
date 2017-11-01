function getDatesForUser(activeVisits, ID) {
  const usersDates = activeVisits.filter((visit) => {
      return (visit.clientID == ID);
    })
    .map((visit) => {
      return {
        date: visit.date,
        duration: visit.duration
      };
    });

  return usersDates;
}

function getWatchesForUser(activeHits, ID) {
  const userWatches = activeHits.filter((hit) => {
      return (hit.clientID == ID);
    })
    .map((watch) => {
      return watch.title
    });

  const clearedWatches = userWatches.filter((hit, index, userWatches) => {
    return (userWatches.indexOf(hit) == index);
  });
  return clearedWatches;
}


module.exports.getWatchesForUser = getWatchesForUser;
module.exports.getDatesForUser = getDatesForUser;