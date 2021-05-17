import React, { useEffect } from 'react';

import axios from 'axios';

import {
  Button,
  Checkbox,
  Fab,
  Icon,
  Link,
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
  getRefreshInterval,
} from './constants';
import NotificationService from './NotificationService';
import {
  fetchCenters,
  useInterval,
} from './utility';

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
    centers, setCenters,
    vaccines, setVaccines,
    vaccineSelected, setVaccineSelected,
    ageGroup, setAgeGroup,
    ageGroupSelected, setAgeGroupSelected,
    doseSelected, setDoseSelected,
    durationSelected, setDurationSelected,
    gridApi,
    setFilterDataModel,
  } = props;

  const [timeRemaining, setTimeRemaining] = React.useState(getRefreshInterval());
  const [shouldNotify, setShouldNotify] = React.useState(false);

  const propsToPass = {
    ...props,
    shouldNotify, setShouldNotify,
  };

  useEffect(() => {
    axios.get(GET_STATES)
      .then((response) => {
        setStates(response.data.states);
      });
    if (districtsSelected.length) {
      loadDistrictData(stateSelected);
      loadFreshData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    const newTimeRemaining = timeRemaining - 1;
    if (newTimeRemaining === 0) {
      if (districtsSelected.length) {
        loadFreshData(true);
      }
    }
    if (newTimeRemaining >= 0) {
      setTimeRemaining(newTimeRemaining);
    }
  }, 1000);

  const saveFilterModel = () => {
    const currentFilterModel = gridApi?.getFilterModel() || {};
    setFilterDataModel(currentFilterModel);
  }

  const resetValuesOnStateChange = () => {
    setDistricts(null);
    setDistrictsSelected([]);
    resetValuesOnDistrictChange(true);
  }

  const resetValuesOnDistrictChange = (resetVaccineAndAge) => {
    saveFilterModel();
    setRawCenters(null);
    setCenters(null);
    if (resetVaccineAndAge) {
      setVaccines(null);
      setVaccineSelected(DEFAULT_VACCINE);
      setAgeGroup(null);
      setAgeGroupSelected(DEFAULT_AGE);
    }
  }

  const handleStateChange = (event) => {
    const newStateSelectedValue = event.target.value;
    setStateSelected(newStateSelectedValue);
    resetValuesOnStateChange();
    loadDistrictData(newStateSelectedValue);
  };

  const loadDistrictData = (newStateSelectedValue) => {
    axios.get(`${GET_DISTRICTS}/${newStateSelectedValue}`)
      .then((response) => {
        setDistricts(response.data.districts);
      });
  }

  const loadFreshData = (
    shouldNotifyIfSlotsAvailable = false,
    resetVaccineAndAge = false,
    districtsList = districtsSelected,
    dose = doseSelected,
    duration = durationSelected,
  ) => {
    resetValuesOnDistrictChange(resetVaccineAndAge);
    new Promise(async (resolve) => {
      const [rawCenterData, newVaccines, newAgeGroups, modifiedCenters] = await fetchCenters(districtsList, duration, dose);
      setRawCenters(rawCenterData);
      setCenters(modifiedCenters);
      setVaccines(newVaccines);
      setAgeGroup(newAgeGroups);
      setTimeRemaining(getRefreshInterval());
      if (shouldNotifyIfSlotsAvailable) {
        setShouldNotify(true);
      }
      resolve();
    })
  }

  const handleDistrictChange = (event) => {
    const newDistrictsSelectedValue = event.target.value;
    setDistrictsSelected(newDistrictsSelectedValue);
    loadFreshData(false, true, newDistrictsSelectedValue);
  };

  const handleVaccineChange = (event) => {
    saveFilterModel();
    const value = event.target.value;
    setVaccineSelected(value);
    const centersCopy = centers;
    setCenters(null);
    setTimeout(() => {
      setCenters(centersCopy);
    }, 0);
  };

  const handleAgeGroupChange = (event) => {
    saveFilterModel();
    const value = event.target.value;
    setAgeGroupSelected(value);
    const centersCopy = centers;
    setCenters(null);
    setTimeout(() => {
      setCenters(centersCopy);
    }, 0);
  }

  const handleDoseChange = (event) => {
    const value = event.target.value;
    setDoseSelected(value);
    loadFreshData(false, false, districtsSelected, value);
  }

  const handleDurationChange = (event) => {
    const value = event.target.value;
    setDurationSelected(value);
    loadFreshData(false, false, districtsSelected, doseSelected, value);
  }

  const ageGroupMenuText = (value) => {
    switch (value) {
      case 18: {
        return '18-44';
      }
      case 45: {
        return '45+';
      }
      default: {
        return value;
       }
    }
  }

  const getTimeRemainingText = () => {
    switch (timeRemaining) {
      case 0: {
        return 'Refreshing'
      }
      default: {
        return `in ${timeRemaining} s`;
      }
    }
  }

  return (
    <div style={{display: 'flex', overflowX: 'auto', marginRight: '8px'}}>
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
              <MenuItem value={DEFAULT_VACCINE}>
                <em>Any</em>
              </MenuItem>
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
              <MenuItem value={DEFAULT_AGE}>
                <em>All</em>
              </MenuItem>
              {
                Array.from(ageGroup)?.map((ageGroupItem, index) => 
                <MenuItem key={index} value={ageGroupItem}>
                    {ageGroupMenuText(ageGroupItem)}
                </MenuItem>)
              }
            </Select>
          </FormControl> :
          null
      }
      {
        vaccines && ageGroup ?
          <>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Dose</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={doseSelected}
                onChange={handleDoseChange}
                label="Dose"
              >
                <MenuItem value="1">1st Dose</MenuItem>
                <MenuItem value="2">2nd Dose</MenuItem>
              </Select>
            </FormControl>
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
            </FormControl>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setTimeRemaining(0);
                loadFreshData();
              }}
              style={{margin: '8px', height: '56px', minWidth: '152px'}}
            >
              <Icon >cached</Icon>
              <div>&nbsp; {getTimeRemainingText()}</div>
            </Button>
            <NotificationService {...propsToPass} />
            <Link
              href="https://www.notion.so/Covid-Vaccine-Checker-9f555f4295764092a4d28e207e60e392"
              target="_blank"
              style={{alignSelf: 'center', textDecoration: 'none', minWidth: '156px'}}
            >
              <Fab variant="extended">
                Usage guide &nbsp;
                <Icon>help_outline</Icon>
              </Fab>
            </Link>
          </>
          :
          null
      }
    </div>
  )
}

export default FilterOptions;