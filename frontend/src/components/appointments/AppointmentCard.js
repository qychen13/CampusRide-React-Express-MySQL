import React, { Component } from 'react';
import {getAutoAppointment, getCartAppointment, cancelAppointment} from '../../api/student.js';
import moment from 'moment';

export default class AppointmentCard extends Component{
  delete_auto_rows=[];
  delete_cart_rows=[];
  constructor(props){
    super(props);
    this.state={onEdit:false,
                autoride: [],
                cartride: [],
              }
    this.onClickEdit=this.onClickEdit.bind(this);
    this.onClickSubmit=this.onClickSubmit.bind(this);
    this.onClickRevert=this.onClickRevert.bind(this);
  }
  onClickEdit(){
    this.setState({onEdit:true});
  }
  onClickSubmit(){
    let cancel_auto_apt_ids=this.delete_auto_rows.map((item)=>this.state.autoride[item].apt_id);
    let cancel_cart_apt_ids=this.delete_cart_rows.map((item)=>this.state.cartride[item].apt_id);
    let cancel_apt_ids=cancel_cart_apt_ids.concat(cancel_auto_apt_ids);
    cancelAppointment(cancel_apt_ids).then(
      ()=>window.location.reload()
    );
  }
  onClickRevert(){
    this.setState({onEdit:false});
    this.delete_auto_rows = [];
    this.delete_cart_rows = [];
    window.location.reload();
  }
  onDeleteAutoAppointment=(row)=>()=>this.delete_auto_rows.push(row);
  onDeleteCartAppointment=(row)=>()=>this.delete_cart_rows.push(row);
  componentDidMount(){
    let autoride;
    let cartride;
    getAutoAppointment().then(
      (autodata)=>autoride=autodata.data).then(
      ()=>getCartAppointment()).then(
      (cartdata)=>cartride=cartdata.data).then(
      ()=>this.setState({autoride:autoride, cartride:cartride}));
  }
  render(){
    return <div class="card">
              <div class="card-header card-header-primary">
                  <h3 class="card-title">Your Appointments</h3>
              </div>
              <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                      <h4 class="card-title">Auto Ride Appointments</h4>
                      {!this.state.onEdit?
                        (<button type="button">
                          <i class="material-icons" onClick={this.onClickEdit}>edit</i>
                        </button>):null}
                      {this.state.autoride.map((item, index)=>(
                        <div key={index} class="alert alert-info">
                          {this.state.onEdit?(
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.onDeleteAutoAppointment(index)}>
                                <i class="material-icons">close</i>
                            </button>
                          ):null}
                            <span> You will be picked up at stop <b>{item.pick_up_stop} {item.pick_up_stop_name}</b> at <b>{item.pick_up_time}, {moment(item.date).format('MM/DD/YYYY')}</b> and dropped off at stop <b>{item.drop_off_stop} {item.drop_off_stop_name}</b> </span>
                        </div>
                      ))}
                  </div>
                    <div class="col-md-6">
                        <h4 class="card-title">Cart Ride Appointments</h4>
                          {!this.state.onEdit?
                            (<button type="button">
                              <i class="material-icons" onClick={this.onClickEdit}>edit</i>
                            </button>):null}
                          {this.state.cartride.map((item, index)=>(
                            <div key={index} class="alert alert-success">
                              {this.state.onEdit?(
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.onDeleteCartAppointment(index)}>
                                    <i class="material-icons">close</i>
                                </button>
                              ):null}
                                <span> You will be picked up at stop <b>{item.pick_up_stop} {item.pick_up_stop_name}</b> at <b>{item.pick_up_time}, {moment(item.date).format('MM/DD/YYYY')}</b> by our driver <b>{item.driver_first_name} {item.driver_last_name}</b> </span>
                            </div>
                          ))}
                    </div>
                </div>
                {this.state.onEdit?(
                <div class="row">
                  <div class="col-md-4 offset-md-1">
                      <button class="btn btn-primary btn-block" onClick={this.onClickSubmit}>Submit Change</button>
                  </div>
                  <div class="col-md-4 offset-md-2">
                      <button class="btn btn-primary btn-block" onClick={this.onClickRevert}>Cancle Change</button>
                  </div>
                </div>
              ):null
                }
              </div>
          </div>
  }
}
