import sendRequest from './sendRequest';

export const getStudentInfo=()=>sendRequest('/student/info/query', null, true);
export const updateStudentInfo=(profile)=>sendRequest('/student/info/update', profile, true);
export const makeAppointment=(schedule)=>sendRequest('/student/appointment/new', schedule, true);
export const getAutoAppointment=()=>sendRequest('/student/appointment/query/auto', null, true);
export const getCartAppointment=()=>sendRequest('/student/appointment/query/cart', null, true);
export const cancelAppointment=(apt_ids)=>sendRequest('/student/appointment/cancel', {apt_ids: apt_ids}, true);
