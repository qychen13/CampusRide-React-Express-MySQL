import React, { Component } from 'react';

import {fetchStopInfo} from '../../api/public';

class StopSelect extends Component{
  constructor(props){
    super(props);
    this.state ={stops: []}
  }
  componentDidMount(){

    fetchStopInfo().then(data=>
    this.setState({stops: data.data}));
  }
  render(){
    return  <select class="selectpicker" onChange={this.props.onSelect}>
                <option disabled selected >-- select stop --</option>
                {this.state.stops.map((stop)=><option key={stop.stop_id} value={stop.stop_id}>{stop.stop_id} {stop.name}</option>)}
            </select>
  }
}

export default StopSelect;
