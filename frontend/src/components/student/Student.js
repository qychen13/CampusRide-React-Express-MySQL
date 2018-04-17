import React, { Component } from 'react';

import InfoCard from './InfoCard.js';
import {AutoTimeTable, CartTimeTable} from './TimeTable.js';
import AppointmentCard from './AppointmentCard.js';


class Student extends Component {
  constructor(props) {
        super(props);

        this.state = {
            select_student_id: null
        };
        this.onSelectStudentId = this.onSelectStudentId.bind(this);
  }
  onSelectStudentId=(stu_id) => {
    this.setState({select_student_id: stu_id});
    // this.select_student_id=stu_id;
    // console.log(this.state.select_student_id);
  }
  render() {
    return  <div>
              <InfoCard onSelectStudentId={this.onSelectStudentId}/>
              <AppointmentCard />
              <AutoTimeTable studentId={this.state.select_student_id}/>
              <CartTimeTable studentId={this.state.select_student_id}/>
            </div>
  }
}

export default Student;
