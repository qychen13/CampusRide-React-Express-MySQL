import sendRequest from './sendRequest';

export const fetchStopInfo=()=> sendRequest('/public/stops');
export const fetchTimeTable=(body)=> sendRequest('/public/timetable', body);
