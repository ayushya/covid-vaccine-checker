import React, { useEffect } from 'react';

import axios from 'axios';

import {
  Checkbox,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {
  DEFAULT_AGE,
  DEFAULT_VACCINE,
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
    districtsSelected, setDistrictsSelected,
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

  const resetValuesOnStateChange = () => {
    setDistricts(null);
    setDistrictsSelected([]);
    resetValuesOnDistrictChange();
  }

  const resetValuesOnDistrictChange = () => {
    setRawCenters(null);
    setCenters(null);
    setVaccines(null);
    setVaccineSelected(DEFAULT_VACCINE);
    setAgeGroup(null);
    setAgeGroupSelected(DEFAULT_AGE);
  }

  const handleStateChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setStateSelected(newStateSelectedValue);
    resetValuesOnStateChange();
    axios.get(`${GET_DISTRICTS}/${newStateSelectedValue}`)
      .then((response) => {
        setDistricts(response.data.districts);
      });
  };

  const loadFreshData = (districtsList, duration) => {
    resetValuesOnDistrictChange();
    new Promise(async (resolve) => {
      const [rawCenterData, newVaccines, newAgeGroups, modifiedCenters] = await fetchCenters(districtsList, duration);
      setRawCenters(rawCenterData);
      setVaccines(newVaccines);
      setAgeGroup(newAgeGroups);
      setCenters(modifiedCenters);
      resolve();
    })
  }

  const handleDistrictChange = (event) => {
    const newDistrictsSelectedValue = event.target.value;
    setDistrictsSelected(newDistrictsSelectedValue);
    loadFreshData(newDistrictsSelectedValue, durationSelected);
  };

  const handleVaccineChange = (event) => {
    const value = event.target.value;
    setVaccineSelected(value);
  };

  const handleAgeGroupChange = (event) => {
    const value = event.target.value;
    setAgeGroupSelected(value);
  }

  const handleDurationChange = (event) => {
    const value = event.target.value;
    setDurationSelected(value);
    loadFreshData(districtsSelected, value);
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
              multiple
              id="demo-simple-select-outlined"
              value={districtsSelected}
              onChange={handleDistrictChange}
              label="Districts"
              renderValue={(selected) => {
                return districts.reduce((prev, district) => {
                  if (selected.some((item) => district.district_id === item)) {
                    return `${prev}, ${district.district_name}`;
                  } else {
                    return prev;
                  } 
                }, '').slice(1);
              }}
            >
              {
                districts?.map(({ district_id, district_name }, index) => (
                  <MenuItem key={index} value={district_id}>
                    <Checkbox checked={districtsSelected.indexOf(district_id) > -1} />
                    <ListItemText primary={district_name} />
                  </MenuItem>
                ))
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