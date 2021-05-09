export const VACCINE_REGISTRATION_URL = 'https://selfregistration.cowin.gov.in/';

export const SERVER_API_URL = 'https://cdn-api.co-vin.in/api/v2';

export const GET_STATES = `${SERVER_API_URL}/admin/location/states`;

export const GET_DISTRICTS = `${SERVER_API_URL}/admin/location/districts`;

export const GET_CENTERS_BY_DISTRICT = `${SERVER_API_URL}/appointment/sessions/public/calendarByDistrict`;

export const GET_CENTERS_BY_DISTRICT_ADMIN = `${SERVER_API_URL}/appointment/sessions/calendarByDistrict`;

export const DEFAULT_STATE = '16';

export const DEFAULT_DISTRICTS_SELECTED = [294, 265, 276];

export const DEFAULT_VACCINE = 'any';

export const DEFAULT_AGE = 'all';

export const DEFAULT_DURATION = 1;

export const REFRESH_INTERVAL = 300;

export const REFRESH_INTERVAL_FAST = 10;

export const DEFAULT_NOTIFICATION_ENABLED = false;

export const getCentersByDistrict = () => {
    return localStorage.getItem('godMode') == 'true' ? GET_CENTERS_BY_DISTRICT_ADMIN : GET_CENTERS_BY_DISTRICT;
}

export const getRefreshInterval = () => {
    return localStorage.getItem('godMode') == 'true' ? REFRESH_INTERVAL_FAST : REFRESH_INTERVAL;
}
