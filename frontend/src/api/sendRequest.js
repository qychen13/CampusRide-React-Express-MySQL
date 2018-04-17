import {getAccessToken} from '../Auth/Auth.js';
import Notification from '../components/Notification.js';

export default async function sendRequest(path, body = null, token=false) {
  let req={'headers':{}};
  if(token){
      req.headers.Authorization = 'Bearer '+getAccessToken();
    }
  if(body){
    req.method='POST'
    req.headers['Content-Type']='application/json';
    req.body = JSON.stringify(body);
    // console.log(body);
  }
  try{
    if(req.headers === {}) req = null;
    const response = await fetch(path, req);
    if(response.status>=400) {
      if(response.status==401)
        Notification.showError('You must login to do that!');
      else
        Notification.showError('Bad response from server: status'+response.status);
      return {fields:[], data:[]};
    };
    const data = await response.json();
    if(data.error) {Notification.showError(data.error); return {fields:[], data:[]};}
    if(data.message) Notification.showSuccess(data.message);
    return data;
  }catch(err){
    console.log(err);
    throw err;
  }
}
