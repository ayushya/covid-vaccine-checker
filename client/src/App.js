import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import React, { useEffect } from 'react';

import {
  AgGridColumn,
  AgGridReact,
} from 'ag-grid-react';
import moment from 'moment';

import { CircularProgress } from '@material-ui/core';

import {
  DEFAULT_AGE,
  DEFAULT_DISTRICTS_SELECTED,
  DEFAULT_DURATION,
  DEFAULT_STATE,
  DEFAULT_VACCINE,
  VACCINE_REGISTRATION_URL,
} from './constants';
import FilterOptions from './FilterOptions';

const App = () => {
  const [states, setStates] =  React.useState(null);
  const [stateSelected, setStateSelected] = React.useState(localStorage.getItem('stateSelected') || DEFAULT_STATE);
  const [districts, setDistricts] = React.useState(null);
  const [districtsSelected, setDistrictsSelected] = React.useState(JSON.parse(localStorage.getItem('districtsSelected')) || DEFAULT_DISTRICTS_SELECTED);
  const [rawCenters, setRawCenters] = React.useState(null);
  const [centers, setCenters] = React.useState(null);

  const [vaccines, setVaccines] = React.useState(null);
  const [vaccineSelected, setVaccineSelected] = React.useState(localStorage.getItem('vaccineSelected') || DEFAULT_VACCINE);

  const [ageGroup, setAgeGroup] = React.useState(null);
  const [ageGroupSelected, setAgeGroupSelected] = React.useState(localStorage.getItem('ageGroupSelected') || DEFAULT_AGE);

  const [durationSelected, setDurationSelected] = React.useState(localStorage.getItem('durationSelected') || DEFAULT_DURATION);

  const [gridApi, setGridApi] = React.useState(null);

  const [filterDataModel, setFilterDataModel] = React.useState(JSON.parse(localStorage.getItem('filterDataModel')) || {});

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
    durationSelected, setDurationSelected,
    gridApi, setGridApi,
    filterDataModel, setFilterDataModel,
  };

  useEffect(() => {
    localStorage.setItem('stateSelected', stateSelected);
    localStorage.setItem('districtsSelected', JSON.stringify(districtsSelected));
    localStorage.setItem('vaccineSelected', vaccineSelected);
    localStorage.setItem('ageGroupSelected', ageGroupSelected);
    localStorage.setItem('durationSelected', durationSelected);
    localStorage.setItem('filterDataModel', JSON.stringify(filterDataModel));
    setTimeout(() => {
      gridApi?.setFilterModel(filterDataModel);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSelected, districtsSelected, vaccineSelected, ageGroupSelected, durationSelected, gridApi]);

  const dateMap = Array.apply(null, new Array(7 * 4 * parseInt(durationSelected))).map((curr, index) => {
    return moment().add(index, 'days').format('DD-MM-YYYY');
  });

  const onGridReady = (params) => {
    setGridApi(params.api);
  }

  const rowDataFilter = (node) => {
    const total  = node.data.availability[ageGroupSelected]?.[`${vaccineSelected}_total`];
    return total !== undefined
  }

  const quantityRenderer = ({ value }) => {
    switch (value) {
      case undefined: {
        return 'NA';
      }
      case 0: {
        return 'Booked';
      }
      default: {
        return `<a href=${VACCINE_REGISTRATION_URL} target="_blank" style="color:#fff; text-decoration: none"}>${value}</a>`;
      }
    }
  }

  const quantityStyle = ({ value }) => {
    const commonStyles = {
      display: 'flex',
      justifyContent: 'center',
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
        return { color: '#fff', backgroundColor: '#2ecc71', cursor: 'pointer', ...commonStyles };
      }
    }
  }

  const feeStyle = ({ value }) => {
    const commonStyles = {
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '700',
      border: '1px solid rgb(186, 191, 199)'
    };
    switch (value) {
      case 'Free': {
        return { color: '#fff', backgroundColor: '#2196f3', ...commonStyles };
      }
      default: {
        return { color: '#fff', backgroundColor: '#ff9800', ...commonStyles };
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
                suppressMovable: true
              }}
              enableCellTextSelection={true}
              defaultColGroupDef={{ marryChildren: true }}
              animateRows={true}
              isExternalFilterPresent={() => true}
              doesExternalFilterPass={rowDataFilter}
              onGridReady={onGridReady}
              tooltipShowDelay={0}
              rowData={centers}>
              <AgGridColumn field="pincode" sortable={true} filter={true} pinned="left"></AgGridColumn>
              <AgGridColumn field="name" tooltipField={"name"} sortable={true} filter={true} width={200} pinned="left"></AgGridColumn>
              <AgGridColumn
                headerName="Fee"
                field="fee_type"
                valueGetter={({ data: { fee_type, vaccine_fees}}) => vaccine_fees?.[0].fee || fee_type }
                valueFormatter={({ data: { fee_type, vaccine_fees } }) => vaccine_fees ? `₹ ${vaccine_fees?.[0].fee}` : fee_type}
                sortable={true}
                filter={true}
                pinned="left"
                cellStyle={feeStyle}
              />
              <AgGridColumn
                headerName="# Total"
                field={`availability.${ageGroupSelected}.${vaccineSelected}_total`}
                sortable={true}
                filter={false}
                width={120}
                pinned="left"
                cellStyle={quantityStyle}
                sort={'desc'}
                cellRenderer={quantityRenderer}
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
                    cellStyle={quantityStyle}
                    cellRenderer={quantityRenderer}
                    onCellClicked={({event, value}) => {
                      if (value > 0) {
                        event.target.querySelector('a')?.click();
                      }
                    }}
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