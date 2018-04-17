var express = require('express');
var router = express.Router();
const {query_send_data, update_data}= require('./utilities.js')
const format = require('string-format');
format.extend(String.prototype, {});

// student info
process_data = (req, res, next)=>{
  let sql='select email, first_name, last_name, cellphone, disabled_injured from Student where student_id='+req.user.student_id;
  return query_send_data(sql)(req, res, next)
}
router.use('/info/query', process_data);

// update profile
process_data = (req, res, next)=>{
  if(req.body.first_name&&req.body.last_name&&('disabled_injured' in req.body)&&req.body.cellphone){
    let sql='update Student set first_name=\'{first_name}\', last_name=\'{last_name}\', disabled_injured={disabled_injured}, cellphone=\'{cellphone}\' '.format(req.body);
    sql+=' where student_id='+req.user.student_id;
    return update_data(sql)(req, res, next);
  }
  next();
}
router.use('/info/update', process_data);
// make appointment
process_data = (req, res, next)=>{
  if(req.body.pick_up_stop&&req.body.pick_up_time)
    req.body.student_id = req.user.student_id;
    // auto ride
    if(req.body.drop_off_stop){
      let sql = 'call insert_auto_ride('+
      '{student_id}, {schedule_id}, \'{pick_up_time}\', {pick_up_stop}, {drop_off_stop})'.format(req.body);
      return update_data(sql)(req, res, next);
    }// private ride
    else{
      let sql = 'insert into Appointment(student_id, schedule_id, type, pick_up_time, pick_up_stop)'+
      ' values({student_id}, {schedule_id}, \'cart\', \'{pick_up_time}\', {pick_up_stop})'.format(req.body);
      return update_data(sql)(req, res, next);
    }
  next();
}
router.use('/appointment/new', process_data);
//query appontment
process_data = (req, res, next)=>{
  let sql = 'select Appointment.apt_id, date, pick_up_time, pick_up_stop, stop1.name as pick_up_stop_name, drop_off_stop, stop2.name as drop_off_stop_name '+
            'from Appointment,  AutoRide, Schedule, Stop Stop1, Stop Stop2 '+
            'where student_id ='+req.user.student_id+' and type=\'auto\' and Appointment.apt_id = AutoRide.apt_id '+
            'and Schedule.schedule_id= Appointment.schedule_id and Stop1.stop_id=pick_up_stop and Stop2.stop_id=drop_off_stop and date>=curdate() '+
            'order by date, pick_up_time';
  return query_send_data(sql)(req, res, next);
}
router.use('/appointment/query/auto', process_data);
process_data = (req, res, next)=>{
  let sql = 'select Appointment.apt_id, date, pick_up_time, pick_up_stop, Stop.name as pick_up_stop_name, first_name as driver_first_name, last_name as driver_last_name '+
            'from Appointment,  Schedule, Driver, Stop '+
            'where student_id ='+req.user.student_id+' and type=\'cart\' '+
            'and Schedule.schedule_id= Appointment.schedule_id and Schedule.driver_id=Driver.driver_id and Stop.stop_id=pick_up_stop and date>=curdate() '+
            'order by date, pick_up_time';
  return query_send_data(sql)(req, res, next);
}
router.use('/appointment/query/cart', process_data);
//cancle appointment
process_data = async (req, res, next)=>{
  if(req.body.apt_ids){
    const {findUserByAppointment} = require('../utils/user.js');
    let student_id;
    let sql='delete from Appointment where ';
    let index = 0;
    for(let apt_id of req.body.apt_ids){
      student_id = await findUserByAppointment(apt_id);
      if(student_id!=req.user.student_id){
        res.status(401).send(); // unauthorized error
        return ;
      }
      if(index===0) sql+=' apt_id='+apt_id;
      else sql += ' or apt_id='+apt_id;
      index+=1;
    }
    if(index==0) return next();
    return update_data(sql)(req, res, next);
  }
  next();
}
router.use('/appointment/cancel', process_data);

module.exports = router;
