import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import React, { useEffect } from 'react';

import {
  AgGridColumn,
  AgGridReact,
} from 'ag-grid-react';
import axios from 'axios';
import moment from 'moment';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

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

const App = () => {
  const classes = useStyles();
  const [states, setStates] =  React.useState(null);
  const [stateSelected, setStateSelected] = React.useState('');
  const [districts, setDistricts] = React.useState(null);
  const [districtSelected, setDistrictSelected] = React.useState('');
  const [rawCenters, setRawCenters] = React.useState(null);
  const [centers, setCenters] = React.useState(null);

  const [vaccines, setVaccines] = React.useState(null);
  const [vaccineSelected, setVaccineSelected] = React.useState('COVAXIN');

  const [ageGroup, setAgeGroup] = React.useState(null);
  const [ageGroupSelected, setAgeGroupSelected] = React.useState(18);

  const dateMap = Array.apply(null, new Array(7)).map((curr, index) => {
    return moment().add(index, 'days').format('DD-MM-YYYY');
  });

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
            total:0,

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

  const rowDataFilter = (node) => {
    const total  = node.data.availability[ageGroupSelected]?.[`${vaccineSelected}_total`];
    return total !== undefined
  }

  const quantityFormatter = ({value}) => {
    switch (value) {
      case undefined: {
        return 'NA';
      }
      case 0: {
        return 'Booked';
      }
      default: {
        return value;
      }
    }
  }

  const quantityStyle = ({ value }) => {
    const commonStyles = {
      textAlign: 'center',
      fontWeight: '700',
      border: '1px solid rgb(186, 191, 199)'
    };
    switch (value) {
      case undefined: {
        return { color: 'rgba(0, 0, 0, 0.87)', backgroundColor: '#e0e0e0', ...commonStyles };
      }
      case 0: {
        return { color: '#fff', backgroundColor: 'rgb(220, 0, 78)', ...commonStyles };
      }
      default: {
        return { color: '#fff', backgroundColor: '#2ecc71', ...commonStyles };
      }
    }
  }

  return (
    <div>
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
      {
        centers?.length ?
          <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 72px)', width: '100%' }}>
            <AgGridReact   
              defaultColDef={{
                width: 120,
                // editable: true,
                // filter: 'agTextColumnFilter',
                floatingFilter: true,
                resizable: true,
              }}
              defaultColGroupDef={{ marryChildren: true }}
              animateRows={true}
              isExternalFilterPresent={() => true}
              doesExternalFilterPass={rowDataFilter}
              rowData={centers}>
              <AgGridColumn field="pincode" sortable={true} filter={true} pinned="left"></AgGridColumn>
              <AgGridColumn field="name" sortable={true} filter={true} width={200} pinned="left"></AgGridColumn>
              <AgGridColumn headerName="Fee" field="fee_type" sortable={true} filter={true} pinned="left"></AgGridColumn>
              <AgGridColumn
                headerName="# Total"
                field={`availability.${ageGroupSelected}.${vaccineSelected}_total`}
                sortable={true}
                filter={false}
                width={120}
                pinned="left"
                valueFormatter={quantityFormatter}
                cellStyle={quantityStyle}
                sort={'desc'}
              />
              {
                dateMap?.map((dateItem, index) =>
                  <AgGridColumn
                    key={index}
                    headerName={dateItem}
                    field={`availability.${ageGroupSelected}.${vaccineSelected}.${dateItem}`}
                    sortable={true}
                    filter={false}
                    width={130}
                    cellStyle={{textAlign: 'center'}}
                    valueFormatter={quantityFormatter}
                    cellStyle={quantityStyle}
                  />
                )
              }
              {/* <AgGridColumn headerName="Available" field="availability.total" sortable={true} filter={true}></AgGridColumn> */}
              {/* <AgGridColumn field="info.title" sortable={true} filter={true}></AgGridColumn> */}
                {/* {
                  Object.keys(centers[0]).map((item) => {
                    <AgGridColumn field={item} sortable={true} filter={true}></AgGridColumn>
                  })
                } */}
            </AgGridReact>
          </div> :
          null
      }
    </div>
  );
}

export default App;