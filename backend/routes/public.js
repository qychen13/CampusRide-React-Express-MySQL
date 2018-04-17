var express = require('express');
const format = require('string-format');
format.extend(String.prototype, {});
var {query_send_data} = require('./utilities.js');
var router = express.Router();
var moment = require('moment');

let process_data;

// Look up StopTimeTable
process_data= (req, res, next)=>{
  // auto timetable
  if(req.body.date&&req.body.pick_up_stop&&req.body.drop_off_stop){
        let date='\'{}\''.format(req.body.date);
        let pick_up_stop=req.body.pick_up_stop;
        let drop_off_stop = req.body.drop_off_stop;
        /* version one
        let sql = 'select schedule_id, line_id, maker, capacity, year, pick_up_time, drop_off_time '+
                  ' from StopTimeTable, Schedule, Auto '+
                  ' where pick_up_stop='+pick_up_stop+
                  ' and drop_off_stop='+drop_off_stop+
                  ' and date='+date+
                  ' and Schedule.vehicle_id=StopTimeTable.vehicle_id '+
                  ' and Schedule.vehicle_id=Auto.vehicle_id'+
                  ' order by pick_up_time';
        */
        /* version two
        let sql = ' select Appointment.apt_id, Appointment.schedule_id, Appointment.pick_up_time, drop_off_time from '+
                  ' (select schedule_id, pick_up_time, pick_up_stop, drop_off_time, drop_off_stop '+
                  ' from StopTimeTable, Schedule '+
                  ' where pick_up_stop='+pick_up_stop+
                  ' and drop_off_stop='+drop_off_stop+
                  ' and date='+date+
                  ' and Schedule.vehicle_id=StopTimeTable.vehicle_id) '+
                  ' AutoTimeTable, Appointment, AutoRide'+
                  ' where Appointment.type=\'auto\' and Appointment.apt_id=AutoRide.apt_id'+
                  ' and Appointment.schedule_id=AutoTimeTable.schedule_id '+
                  ' and AutoTimeTable.pick_up_stop=Appointment.pick_up_stop and AutoRide.drop_off_stop=AutoTimeTable.drop_off_stop';
        */
        // version three: support seats_left query
        let AppointmentTable = '(select Appointment.apt_id, Appointment.schedule_id, stoptimetable.vehicle_id, stoptimetable.pick_up_time, drop_off_time '+
                                ' from Appointment, AutoRide, Schedule, stoptimetable '+
                                ' where '+
                                ' Appointment.type=\'auto\' and date='+date+
                                ' and Appointment.apt_id=AutoRide.apt_id '+
                                ' and Schedule.schedule_id=Appointment.schedule_id '+
                                ' and stoptimetable.vehicle_id = Schedule.vehicle_id '+
                                ' and stoptimetable.drop_off_stop = AutoRide.drop_off_stop '+
                                ' and stoptimetable.pick_up_stop = Appointment.pick_up_stop) AppointmentTable ';
        let SelectedStopTimeTable = '(select line_id, vehicle_id, pick_up_time, drop_off_time from stoptimetable '+
                                ' where pick_up_stop='+pick_up_stop+' and drop_off_stop='+drop_off_stop+') SelectedStopTimeTable';
        let LeftJoinTable = '(select SelectedStopTimeTable.*, apt_id from '+
                              SelectedStopTimeTable + ' left join '+ AppointmentTable +
                              ' on SelectedStopTimeTable.vehicle_id=AppointmentTable.vehicle_id '+
                              ' and not SelectedStopTimeTable.pick_up_time>AppointmentTable.drop_off_time '+
                              ' and not SelectedStopTimeTable.drop_off_time<AppointmentTable.pick_up_time) T';
        let AptCountTable = '(select vehicle_id, line_id, pick_up_time, drop_off_time, count(apt_id) as apt_count from '+
                            LeftJoinTable+' group by vehicle_id, pick_up_time, drop_off_time, line_id) AptCountTable ';
        let FinalTable = 'select schedule_id, line_id, maker, year, pick_up_time, drop_off_time, capacity, capacity-apt_count as seats_left '+
                          ' from '+AptCountTable+ ', Schedule, Auto '+
                          ' where date='+date+' and Schedule.vehicle_id=AptCountTable.vehicle_id and Auto.vehicle_id=Schedule.vehicle_id and capacity>apt_count '+
                          ' order by pick_up_time';
        return query_send_data(FinalTable)(req, res, next);
  }
  // cat timetable
  else if(req.body.datetime){
    const datetime = moment(req.body.datetime);
    let date = datetime.format('YYYY-MM-DD');
    date = '\''+date+'\'';
    let time1 = datetime.subtract(0.5,'hours').format('hh:mm')
    time1 = '\'{}\''.format(time1);
    let time2 = datetime.add(1, 'hours').format('hh:mm');
    time2 = '\'{}\''.format(time2);
    let sql =
              ' select schedule_id, Driver.driver_id, first_name as driver_first_name, last_name as driver_last_name, Cart.vehicle_id as cart_id, wheelchair_acce as accessibility from Schedule, Cart, Driver '+
                ' where date={} '.format(date)+
                ' and Cart.vehicle_id=Schedule.vehicle_id and Driver.driver_id=Schedule.driver_id '+
                ' and not exists '+
                ' (select * from Appointment where schedule_id=Schedule.schedule_id '+
                ' and pick_up_time>{} and pick_up_time<{})'.format(time1, time2);
    return query_send_data(sql)(req, res, next);
  }
  console.log(req.body);
  res.status(400).send(JSON.stringify({error: 'illegal query!'}));
}
router.use('/timetable', process_data);

// Look up StopInfo
process_data = (req, res, next)=>{
	let sql = 'select distinct stop_id, name from Stop order by stop_id';
	return query_send_data(sql)(req, res, next);
}
router.use('/stops', process_data);



module.exports = router;
