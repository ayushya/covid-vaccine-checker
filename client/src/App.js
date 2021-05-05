import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import React from 'react';

import {
  AgGridColumn,
  AgGridReact,
} from 'ag-grid-react';
import moment from 'moment';

import { CircularProgress } from '@material-ui/core';

import {
  DEFAULT_AGE,
  DEFAULT_DURATION,
  DEFAULT_VACCINE,
} from './constants';
import FilterOptions from './FilterOptions';

const App = () => {
  const [states, setStates] =  React.useState(null);
  const [stateSelected, setStateSelected] = React.useState('');
  const [districts, setDistricts] = React.useState(null);
  const [districtsSelected, setDistrictsSelected] = React.useState([]);
  const [rawCenters, setRawCenters] = React.useState(null);
  const [centers, setCenters] = React.useState(null);

  const [vaccines, setVaccines] = React.useState(null);
  const [vaccineSelected, setVaccineSelected] = React.useState(DEFAULT_VACCINE);

  const [ageGroup, setAgeGroup] = React.useState(null);
  const [ageGroupSelected, setAgeGroupSelected] = React.useState(DEFAULT_AGE);

  const [durationSelected, setDurationSelected] = React.useState(DEFAULT_DURATION);

  const propsToPass = {
    states, setStates,
    stateSelected, setStateSelected,
    districts, setDistricts,
    districtsSelected, setDistrictsSelected,
    rawCenters, setRawCenters,
    centers, setCenters,
    vaccines, setVaccines,
    vaccineSelected, setVaccineSelected,
    ageGroup, setAgeGroup,
    ageGroupSelected, setAgeGroupSelected,
    durationSelected, setDurationSelected
  };

  const dateMap = Array.apply(null, new Array(7 * 4 * parseInt(durationSelected))).map((curr, index) => {
    return moment().add(index, 'days').format('DD-MM-YYYY');
  });

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
      <FilterOptions {...propsToPass}/>
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
                    valueFormatter={quantityFormatter}
                    cellStyle={quantityStyle}
                  />
                )
              }
            </AgGridReact>
          </div> :
          districtsSelected.length ?
          <div style={{ height: 'calc(100vh - 72px)', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress style={{ alignSelf: 'center' }} />
          </div> :
          null
      }
    </div>
  );
}

export default App;