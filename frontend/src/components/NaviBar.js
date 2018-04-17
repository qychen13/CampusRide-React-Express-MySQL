import React, { Component } from 'react';

class NaviBar extends Component {
	constructor(props){
    super(props);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
  }
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
	render(){
		const {isAuthenticated} = this.props.auth;
		return <nav class="navbar navbar-expand-lg navbar-transparent  navbar-absolute fixed-top">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <a class="navbar-brand">UNC Charlotte</a>
                    </div>

                    <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">
                                    <i class="material-icons">dashboard</i>
                                    <p>
                                        <span class="d-lg-none d-md-block">Stats</span>
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="material-icons">person</i>
                                    <span class="notification">1</span>
                                    <p>
                                        <span class="d-lg-none d-md-block">Some Actions</span>
                                    </p>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
																	{isAuthenticated()?
																	<a class="dropdown-item" onClick={this.logout}>Logout</a>:
																	<a class="dropdown-item" onClick={this.login}>Login</a>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
	}
}

export default NaviBar;
