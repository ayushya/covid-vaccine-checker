import {
  useEffect,
  useRef,
} from 'react';

import axios from 'axios';
import deepmerge from 'deepmerge';
import moment from 'moment';

const { getCentersByDistrict, REFRESH_INTERVAL } = require("./constants");

export const fetchCenters = async (districtList, month) => {
  const promiseList = [];

  for(let districtIndex = 0; districtIndex < districtList.length; districtIndex++) {
    for(let week = 0; week < 4*month; week++) {
      const centerRequest = axios.get(`${getCentersByDistrict()}`, {
          params: {
          district_id: districtList[districtIndex],
          date: moment().add(7*week, 'days').format('DD-MM-YYYY')
          }
        })
        .then((response) => response.data.centers)
        .catch(error => {
          console.log(error);
          setTimeout(() => {
            window.location.reload();
          }, REFRESH_INTERVAL*1000);
          return [];
        });
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
      all: {
        any_total : 0,
      },
    };

    centerItem.sessions.forEach(item => {
      const minAgeLimit = item.min_age_limit;
      const availableNow = item.available_capacity;
      const vaccineName = item.vaccine;

      newVaccines.add(vaccineName);
      newAgeGroups.add(minAgeLimit);

      availability = {
        ...availability,
        [minAgeLimit]: {
          ...availability[minAgeLimit],
          [vaccineName]: {
            ...(availability[minAgeLimit]?.[vaccineName]),
            [item.date]: availableNow,
          },
          any: {
            ...(availability[minAgeLimit]?.any),
            [item.date]: availableNow,
          }
        },
        all: {
          ...availability.all,
          [vaccineName]: {
            ...(availability.all?.[vaccineName]),
            [item.date]: availableNow,
          },
          any: {
            ...(availability.all?.any),
            [item.date]: availableNow,
          }
        }
      }

      const vaccineTotalKey = `${vaccineName}_total`;
      availability[minAgeLimit][vaccineTotalKey] = availability[minAgeLimit][vaccineTotalKey] ? availability[minAgeLimit][vaccineTotalKey] + availableNow : availableNow;
      availability[minAgeLimit].any_total = availability[minAgeLimit].any_total ? availability[minAgeLimit].any_total + availableNow : availableNow;
      availability.all[vaccineTotalKey] = availability.all[vaccineTotalKey] ? availability.all[vaccineTotalKey] + availableNow : availableNow;
      availability.all.any_total += availableNow;
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

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const getNotificationBody = (newAvailableVaccineCenters) => {
  return newAvailableVaccineCenters.reduce((prev, curr) => {
    const {
      total,
      centerName,
      pincode,
    } = curr.notification;
    const newVaccineEntry = `\nCenter: ${centerName}\nPincode: ${pincode}\nSlots Available: ${total}\n`;
    return prev + newVaccineEntry;
  }, '');
}