import React, { useEffect } from 'react';

import axios from 'axios';
import moment from 'moment';

import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {
  GET_CENTERS_BY_DISTRICT,
  GET_DISTRICTS,
  GET_STATES,
} from './constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FilterOptions = (props) => {
  const classes = useStyles();
  
  const {
    states, setStates,
    stateSelected, setStateSelected,
    districts, setDistricts,
    districtSelected, setDistrictSelected,
    rawCenters, setRawCenters,
    centers, setCenters,
    vaccines, setVaccines,
    vaccineSelected, setVaccineSelected,
    ageGroup, setAgeGroup,
    ageGroupSelected, setAgeGroupSelected,
  } = props;

  useEffect(() => {
    axios.get(GET_STATES)
      .then((response) => {
        setStates(response.data.states);
      });
  }, []);

  const handleStateChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setStateSelected(newStateSelectedValue);
    setDistricts(null);
    axios.get(`${GET_DISTRICTS}/${newStateSelectedValue}`)
      .then((response) => {
        setDistricts(response.data.districts);
      });
  };

  const handleDistrictChange = (event) => {
    const newDistrictSelectedValue = event.target.value;
    setDistrictSelected(event.target.value);
    axios.get(`${GET_CENTERS_BY_DISTRICT}`, {
      params: {
        district_id: newDistrictSelectedValue,
        date: moment().format('DD-MM-YYYY')
      }
    })
      .then((response) => {
        const newCenters = response.data.centers;
        setRawCenters(newCenters);
        const newVaccines = new Set();
        const newAgeGroups = new Set();
        const modifiedCenters = newCenters.map((centerItem) => {
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
        })
        setVaccines(newVaccines);
        setAgeGroup(newAgeGroups);
        setCenters(modifiedCenters);
      });
  };

  const handleVaccineChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setVaccineSelected(newStateSelectedValue);
  };

  const handleAgeGroupChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setAgeGroupSelected(newStateSelectedValue);
  }


  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">States</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={stateSelected}
          onChange={handleStateChange}
          label="State"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            states?.map(({ state_id, state_name }, index) => <MenuItem key={index} value={state_id}>{state_name}</MenuItem>)
          }
        </Select>
      </FormControl>
      {
        districts ?
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Districts</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={districtSelected}
              onChange={handleDistrictChange}
              label="Districts"
            >
              {
                districts?.map(({ district_id, district_name }, index) => <MenuItem key={index} value={district_id}>{district_name}</MenuItem>)
              }
            </Select>
          </FormControl> :
          null
      }
      {
        vaccines ?
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Vaccines</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={vaccineSelected}
              onChange={handleVaccineChange}
              label="Vaccines"
            >
              {
                Array.from(vaccines)?.map((vaccine, index) => <MenuItem key={index} value={vaccine}>{vaccine}</MenuItem>)
              }
            </Select>
          </FormControl> :
          null
      }
      {
        ageGroup ?
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age Group</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={ageGroupSelected}
              onChange={handleAgeGroupChange}
              label="Age Group"
            >
              {
                Array.from(ageGroup)?.map((ageGroupItem, index) => <MenuItem key={index} value={ageGroupItem}>{ageGroupItem}</MenuItem>)
              }
            </Select>
          </FormControl> :
          null
      }
    </div>
  )
}

export default FilterOptions;