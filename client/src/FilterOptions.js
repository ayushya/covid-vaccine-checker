import React, { useEffect } from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {
  GET_DISTRICTS,
  GET_STATES,
} from './constants';
import { fetchCenters } from './utility';

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
    setRawCenters,
    setCenters,
    vaccines, setVaccines,
    vaccineSelected, setVaccineSelected,
    ageGroup, setAgeGroup,
    ageGroupSelected, setAgeGroupSelected,
    durationSelected, setDurationSelected
  } = props;

  useEffect(() => {
    axios.get(GET_STATES)
      .then((response) => {
        setStates(response.data.states);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setDistrictSelected(newDistrictSelectedValue);
    new Promise(async (resolve) => {
      const [rawCenterData, newVaccines, newAgeGroups, modifiedCenters] = await fetchCenters([newDistrictSelectedValue], durationSelected);
      setRawCenters(rawCenterData);
      setVaccines(newVaccines);
      setAgeGroup(newAgeGroups);
      setCenters(modifiedCenters);
      resolve();
    })
  };

  const handleVaccineChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setVaccineSelected(newStateSelectedValue);
  };

  const handleAgeGroupChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setAgeGroupSelected(newStateSelectedValue);
  }

  const handleDurationChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setDurationSelected(newStateSelectedValue);
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
      {
        vaccines && ageGroup ?
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Duration</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={durationSelected}
              onChange={handleDurationChange}
              label="Duration"
            >
              <MenuItem value="1">1 Month</MenuItem>
              <MenuItem value="2">2 Month</MenuItem>
            </Select>
          </FormControl> :
          null
      }
    </div>
  )
}

export default FilterOptions;