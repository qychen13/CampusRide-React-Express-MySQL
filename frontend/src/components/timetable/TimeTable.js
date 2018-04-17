import React, { Component } from 'react';
import moment from 'moment';

import StopSelect from '../template/StopSelect.js';
import Table from '../template/Table.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'

import {fetchTimeTable} from '../../api/public.js';
import {makeAppointment} from '../../api/student.js';

const bindSelectPickStop=(table, refresh=true)=>(e)=>{table.select_pik_stop=e.target.value; if(refresh)table.refreshTimeTable();};
const bindSelectDropStop=(table, refresh=true)=>(e)=>{table.select_drp_stop=e.target.value; if(refresh)table.refreshTimeTable();};
const bindSelectTimeTable=(table)=>(row)=>table.setState({select_time_table_row:row});
const bindSelectDate=(table, refresh=true)=>(date)=>{ table.state.select_date=date; if(refresh)table.refreshTimeTable();table.setState({select_date: date});};

export class AutoTimeTable extends Component{
  select_pik_stop = null;
  select_drp_stop = null;
  constructor(props){
    super(props);
    this.state = {
        time_table: {fields:[], data:[]},
        select_date: moment().add(1,'days'),
        select_time_table_row: null
    };
    this.onMakeAppointment = this.onMakeAppointment.bind(this);
    this.onSelectPickStop = bindSelectPickStop(this);
    this.onSelectDropStop = bindSelectDropStop(this);
    this.onSelectDate = bindSelectDate(this);
    this.onSelectTimeTable = bindSelectTimeTable(this);
    this.login = this.login.bind(this);
  }
  refreshTimeTable(){
    if (this.state.select_date&&this.select_pik_stop&&this.select_drp_stop){
        fetchTimeTable({
          date: this.state.select_date.format('YYYY-MM-DD'),
          pick_up_stop: this.select_pik_stop,
          drop_off_stop: this.select_drp_stop
        }).then(data =>{
        this.setState({time_table: data, select_time_table_row: null})
        });
      }
  }
  onMakeAppointment=()=>{
    if (this.state.select_time_table_row){
      const schedule=this.state.time_table.data[this.state.select_time_table_row];
      schedule.pick_up_stop = this.select_pik_stop;
      schedule.drop_off_stop = this.select_drp_stop;
      makeAppointment(schedule).then(()=>this.refreshTimeTable());
    }
  }
  login=()=>this.props.auth.login();
  render(){
    const {isAuthenticated} = this.props.auth;
    return  <div class="card">
              <div class="card-header card-header-primary">
                  <h3 class="card-title">Auto Ride Time Table</h3>
              </div>
              <div class="card-header card-header-primary">
                  <div>
                    <div class="row">
                        <div class="col-md-2" >
                            <label>date</label>
                            <DatePicker minDate={moment().add(1, 'days')} selected={this.state.select_date} onChange={this.onSelectDate} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <label>pick_up_stop</label>
                            <StopSelect onSelect={this.onSelectPickStop}/>
                        </div>
                        <div class="col-md-4 offset-md-2">
                            <label>drop_off_stop</label>
                            <StopSelect onSelect={this.onSelectDropStop}/>
                        </div>
                    </div>
                </div>
              </div>
              <div class="card-body">
                <Table
                  fields={this.state.time_table.fields}
                  data={this.state.time_table.data}
                  onClickRow={this.onSelectTimeTable}
                />
                <div class="row justify-content-md-center">
                <div class="col-md-4">
                    {isAuthenticated()?
                    <button disabled={this.state.select_time_table_row===null} class="btn btn-primary btn-block" onClick={this.onMakeAppointment}>Make Appointment</button>:
                    <button class="btn btn-primary btn-block" onClick={this.login}>Login to Make Appointment</button>
                    }
                </div>
                </div>
              </div>
          </div>
  }
};

export class CartTimeTable extends Component{
    select_pik_stop = null;
    constructor(props){
      super(props);
      this.state = {
        time_table: {fields:[],data:[]},
        select_date: moment().add(1, 'days'),
        select_time_table_row: null,
      };
      this.onMakeAppointment = this.onMakeAppointment.bind(this);
      this.onSelectPickStop = bindSelectPickStop(this);
      this.onSelectDate = bindSelectDate(this);
      this.onSelectTimeTable = bindSelectTimeTable(this);
      this.login = this.login.bind(this);
    }
    refreshTimeTable(){
      if (this.state.select_date&&this.select_pik_stop){
          fetchTimeTable({
            datetime: this.state.select_date.format(),
            time: this.state.select_date.format('hh:mm'),
            date: this.state.select_date.format('YYYY-MM-DD')
          }).then(data =>{
          this.setState({time_table: data, select_time_table_row: null})});
        }
    }
    onMakeAppointment=()=>{
      if (this.state.select_time_table_row&&this.state.select_date){
        const schedule=this.state.time_table.data[this.state.select_time_table_row];
        schedule.pick_up_stop = this.select_pik_stop;
        schedule.pick_up_time = this.state.select_date.format('hh:mm');
        makeAppointment(schedule).then(()=>this.refreshTimeTable());
      }
    }
    login=()=>{
      this.props.auth.login();
    }
    render(){
      const {isAuthenticated} = this.props.auth;
      return  <div class="card">
                <div class="card-header card-header-primary">
                    <h3 class="card-title">Cart Ride Time Table</h3>
                </div>
                <div class="card-body">
                  <div class="row">
                      <div class="col-md-4" >
                          <label>date</label>
                          <DateTime
                          class="col-md-4"
                          input={false}
                          value={this.state.select_date}
                          onChange={this.onSelectDate}
                          isValidDate={(currentDate)=>currentDate.isAfter(moment())}/>
                      </div>
                      <div class="col-md-4 offset-md-2">
                          <label>pick_up_stop</label>
                          <StopSelect onSelect={this.onSelectPickStop}/>
                      </div>
                  </div>
                </div>
                <div class="card-body">
                  <Table
                    fields={this.state.time_table.fields}
                    data={this.state.time_table.data}
                    onClickRow={this.onSelectTimeTable}
                  />
                  <div class="row justify-content-md-center">
                    <div class="col-md-4">
                        {isAuthenticated()?
                        <button disabled={this.state.select_time_table_row===null} class="btn btn-primary btn-block" onClick={this.onMakeAppointment}>Make Appointment</button>:
                        <button class="btn btn-primary btn-block" onClick={this.login}>Login to Make Appointment</button>
                        }
                    </div>
                  </div>
                </div>
            </div>
    }
  };
