import React, {Component} from 'react';

class Table extends Component {
  constructor(props){
    super(props);
    this.state = {selectedRow: null};
    this.onClickRow = this.onClickRow.bind(this);
  }
  onClickRow = (row)=>()=>{
      if(this.props.onClickRow)
        this.props.onClickRow(row);
      this.setState({selectedRow: row});
  }
  shouldComponentUpdate(prevProps, prevState, snapshot){
    this.state.selectedRow = null;
    return true;
  }
  render(){
    return   <div class="table-responsive">
                <table class="table">
                    <thead class="text-primary">
                        {this.props.fields.map((member)=> <th key={member}>{member}</th>)}
                    </thead>
                    <tbody>
                        {this.props.data.map((row, index)=>
                          <tr  key={this.props.keyfield?row[this.props.keyfield].toString()+index:index}
                               bgcolor={this.state.selectedRow===index? 'red': null}
                               onClick={this.onClickRow(index)}>
                                  {this.props.fields.map((field)=>
                                    <td key={field}>{row[field]}</td>)}
                          </tr>
                        )}
                    </tbody>
                </table>
            </div>
  }
}

export default Table;
