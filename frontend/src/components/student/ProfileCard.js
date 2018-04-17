import React, {Component} from 'react';

import {getStudentInfo, updateStudentInfo} from '../../api/student.js';

class ProfileCard extends Component{
  constructor(props){
    super(props);
    this.state={  email: null,
                  first_name: null,
                  last_name: null,
                  disabled_injured: 0,
                  cellphone: null}
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeInput=(field)=>(e)=> {
    let update_state={}
    let value = e.target.value;
    if(value==='True') value=1;
    if(value==='False') value=0;
    update_state[field]=value;
    this.setState(update_state);
  }
  onSubmit(){
    updateStudentInfo(this.state);
  }
  componentDidMount(){
    getStudentInfo().then(data=>this.setState(data.data[0]));
  }
  render(){
    return <div class="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header card-header-primary">
                                    <h4 class="card-title">Edit Profile</h4>
                                    <p class="card-category">Complete your profile</p>
                                </div>
                                <div class="card-body">

                                        <div class="row">
                                            <div class="col-md-5">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Username (email)</label>
                                                    <input type="text" class="form-control" value={this.state.email} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Fist Name</label>
                                                    <input type="text" value={this.state.first_name} onChange={this.onChangeInput('first_name').bind(this)} class="form-control"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Last Name</label>
                                                    <input type="text" value={this.state.last_name} onChange={this.onChangeInput('last_name').bind(this)} class="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Cellphone</label>
                                                    <input type="text" value={this.state.cellphone} onChange={this.onChangeInput('cellphone').bind(this)} class="form-control"/>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="bmd-label-floating">Disabled/Injured</label>
                                                    <select type="text" value={this.state.disabled_injured?'True':'False'} onChange={this.onChangeInput('disabled_injured').bind(this)} class="form-control">
                                                      <option value='True'>True</option>
                                                      <option value='False'>False</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={this.onSubmit} class="btn btn-primary pull-right">Update Profile</button>
                                        <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card card-profile">
                                <div class="card-avatar">
                                    <a href="#pablo">
                                        <img class="img" src="./favicon.ico" alt="React ICO"/>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-category text-gray">Dear {this.state.first_name?this.state.first_name:'user'}</h5>
                                    <p class="card-description">
                                        Please complete or update your profile for the better experience in Campus Ride App.
                                    </p>
                                    <a class="btn btn-primary btn-round" href="/">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
  }
}
export default ProfileCard;
