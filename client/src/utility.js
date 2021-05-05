import axios from 'axios';
import deepmerge from 'deepmerge';
import moment from 'moment';

const { GET_CENTERS_BY_DISTRICT } = require("./constants");

export const fetchCenters = async (districtList, month) => {
  const promiseList = [];

  for(let districtIndex = 0; districtIndex < districtList.length; districtIndex++) {
    for(let week = 0; week < 4*month; week++) {
      const centerRequest = axios.get(`${GET_CENTERS_BY_DISTRICT}`, {
          params: {
          district_id: districtList[districtIndex],
          date: moment().add(7*week, 'days').format('DD-MM-YYYY')
          }
        })
        .then((response) => response.data.centers);
        promiseList.push(centerRequest);
    }
  }

  const allCentersList = await Promise.all(promiseList);
  const allCenters = allCentersList.reduce((prev, curr) => [...prev, ...curr], []);

  return formatData(allCenters);
}

const formatData = (newCenters) => {
  const newVaccines = new Set();
  const newAgeGroups = new Set();

  const modifiedCenters = mergeDataByCenter(newCenters).map((centerItem, index) => {
    let availability = {
      total: 0,
    };

    centerItem.sessions.forEach(item => {
      const minAgeLimit = item.min_age_limit;
      const availableNow = item.available_capacity;
      const vaccineName = item.vaccine;

      newVaccines.add(vaccineName);
      newAgeGroups.add(minAgeLimit);

      availability[minAgeLimit] = {
        ...availability[minAgeLimit],
        [vaccineName]: {
          ...(availability[minAgeLimit]?.[vaccineName]),
          [item.date]: availableNow,
        },
      }

      const vaccineTotalKey = `${vaccineName}_total`;
      availability[minAgeLimit][vaccineTotalKey] = availability[minAgeLimit][vaccineTotalKey] ? availability[minAgeLimit][vaccineTotalKey] + availableNow : availableNow;
      availability.total += availableNow;
    });
    centerItem['availability'] = availability;
    return centerItem;
  });

  return [newCenters, newVaccines, newAgeGroups, modifiedCenters];
}

const mergeDataByCenter = (newCenters) => {
  const centerIdMap = {};
  const mergedCenters = [];

  newCenters.forEach((centerItem, index) => {
    const centerIdIndex = centerIdMap[centerItem.center_id];
    if (centerIdIndex === undefined) {
      mergedCenters.push(centerItem);
      centerIdMap[centerItem.center_id] = mergedCenters.length - 1;
    } else {
      const oldData = mergedCenters[centerIdIndex];
      mergedCenters[centerIdIndex] = deepmerge(oldData, centerItem);
    }
  });
  return mergedCenters;
}