import React, { Component } from 'react';
import {fetchStudentInfo} from '../../api/student.js'

class InfoCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      student_ids: [],
      student_info: null
    };
    this.onSelect = this.onSelect.bind(this);
  }
 onSelect=(e)=>{
    let stu_id = e.target.value;
    if(this.props.onSelectStudentId)
       this.props.onSelectStudentId(stu_id);
    fetchStudentInfo(stu_id).then(info=>this.setState({student_info:info}));
  }
  componentDidMount(){
    fetchStudentInfo().then(
      data=>data.data).then(
      data=>this.setState({student_ids: data.map((item)=>item.student_id)}));
  }
  render(){
    return    <div class="card">
                 <div class="card-header card-header-primary">
                     <h3 class="card-title">Student Information</h3>
                 </div>
                  <div class="card-body">
                     <div class='row'>
                       <div class="col-md-2">
                         <h4 class="card-title">Student ID</h4>
                         <select onChange={this.onSelect}
                                 class="col-md-12 btn btn-primary btn-block">
                             <option disabled selected >-- select student_id--</option>
                             {this.state.student_ids.map((item)=><option key={item} value={item}>{item}</option>)}
                         </select>
                       </div>
                       <div class='col-md-10'>
                         <h4 class="card-title">student_infor</h4>
                         <div class="alert alert-info">
                             <span>
                               {this.state.student_info?
                               this.state.student_info.fields.map((field)=><p key={field}>{field}: {this.state.student_info.data[0][field]}</p>):
                               <div>This is student info</div>
                               }
                             </span>
                         </div>
                       </div>
                     </div>
                  </div>
            </div>
  }
}

export default InfoCard;
