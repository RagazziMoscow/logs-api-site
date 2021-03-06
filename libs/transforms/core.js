function groupUsersByVisitCount(usersIDsList) {

  const usersIDsListGrouped = usersIDsList.reduce((IDsList, currentID, currentIndex) => {

    const groupIndex = IDsList.findIndex((group, index) => {
      return Object.keys(group)[0] === currentID
    });
    const groupExist = (groupIndex != -1);

    if (groupExist) {
      //console.log(currentID);
      IDsList[groupIndex][currentID] += 1;
    } else {
      let newGroup = {};
      newGroup[currentID] = 1;
      IDsList.push(newGroup);
    }
    return IDsList;
  }, []);

  //usersIDsList = usersIDsList.sort();
  /*
  let usersIDsListGrouped = [];
  for (let currentIndex = 0; currentIndex < usersIDsList.length; currentIndex++) {
    const currentID = usersIDsList[currentIndex];

    const startDate = new Date();
    const start = startDate.getTime();
    const groupIndex = usersIDsListGrouped.findIndex((group, index) => {
      return Object.keys(group)[0] === currentID;
    });
    const endDate = new Date();
    const end = endDate.getTime();
    console.log((end - start) / 1000 / 60);

    const groupExist = (groupIndex != -1);

    if (groupExist) {
      usersIDsListGrouped[groupIndex][currentID] += 1
    } else {
      let newGroup = {};
      newGroup[currentID] = 1;
      usersIDsListGrouped.push(newGroup);
    }
  }
*/
  return usersIDsListGrouped;
}


function sortUsersByVisitCount(groupedIDsList) {
  const sortedIDsList = groupedIDsList.sort((visitOne, visitTwo) => {
    if (visitOne[Object.keys(visitOne)[0]] > visitTwo[Object.keys(visitTwo)[0]]) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedIDsList;
}

module.exports.groupUsersByVisitCount = groupUsersByVisitCount;
module.exports.sortUsersByVisitCount = sortUsersByVisitCount;