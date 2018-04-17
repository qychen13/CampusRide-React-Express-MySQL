//import React from 'react';
import {NotificationManager} from 'react-notifications';

export default class Notification{
  static showInfo(message, title=null){
    NotificationManager.info(message, title);
  }
  static showError(message, title=null){
    NotificationManager.error(message, title);
  }
  static showWarning(message, title=null){
    NotificationManager.warning(message, title);
  }
  static showSuccess(message, title=null){
    NotificationManager.success(message, title);
  }
}
