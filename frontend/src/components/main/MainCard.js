import React, { Component } from 'react';

export default class MainCard extends Component{
  render(){
    return <div class="content">
              <div class="container-fuild">
                <div class="card">
                  <div class="card-header card-header-primary">
                    <h4 class="class-title"> ReadMe </h4>
                    <p class="card-category">App Develepment Decription</p>
                  </div>
                  <div class="card-body">
                    <div id="overview" class="tim-typo">
                       <h4>Overview</h4>
                       <p>
                         In this website, guest user can lookup two timetables, the campus auto ride and the campus cart ride. In order to make the appontments,
                         user should <b class="text-info">log into</b> the system to make the appointment. The login method supports the native register or use
                         the your previous <b class="text-info">google account</b>. After login, the user can<b class="text-info"> make </b> new appointments,
                         <b class="text-info"> lookup</b> and <b class="text-info">cancel</b> the existing appontments. Also, the user can <b class="text-info">
                         update</b> their profile.
                       </p>
                    </div>
                    <div id="rules" class="tim-typo">
                      <h4>Rules and Assumptions</h4>
                        <p>All the appontments should be made at least <b class="text-warning">one day</b> ahead.</p>
                        <h5>About Auto Ride</h5>
                        <p>
                          Auto ride has the fixed timetable for each business day. Each auto would be scheduled to a driver by the manager so that the timetable of
                          that vehicle can be queried by the users. Each auto has maximum capacity and can not be overloaded.
                        </p>
                        <h5>About Cart Ride</h5>
                        <p>
                          Cart ride can have requested pick up time and do not need to make the fixed drop off location. Each cart can only have one appointment within
                          half hour.        
                        </p>
                    </div>
                  </div>
                </div>
              </div>
           </div>
  }
}
