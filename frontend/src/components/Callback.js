import { Component } from 'react';

class Callback extends Component {

  componentDidMount() {
    this.props.auth.handleAuthentication();

  }

  render() {
    return null;
  }
}

export default Callback;
