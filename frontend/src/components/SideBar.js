import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideBar extends Component{
	static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
	render(){
		const {location}= this.props;
		const {isAuthenticated} = this.props.auth;
		return <div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            {/*<!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    -->*/}
            <div class="logo">
                <a  class="simple-text logo-normal">
                    Campus Ride
                </a>
            </div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                    <li class="nav-item ">
                        <a class="nav-link" href="/">
                            <i class="material-icons">dashboard</i>
                            <p>Main</p>
                        </a>
                    </li>
										{isAuthenticated()?
                    (<li class={location.pathname.includes('profile')?"nav-item active":"nav-item"}>
                        <a class="nav-link" href="/profile">
                            <i class="material-icons">person</i>
                            <p>User Profile</p>
                        </a>
                    </li>):null}
                    <li class={location.pathname.includes('auto')?"nav-item active":"nav-item"}>
                        <a class="nav-link" href="/auto">
                            <i class="material-icons">content_paste</i>
                            <p>Auto Time Table</p>
                        </a>
                    </li>
										<li class={location.pathname.includes('cart')?"nav-item active":"nav-item"}>
                        <a class="nav-link" href="/cart">
                            <i class="material-icons">library_books</i>
                            <p>Cart Time Table</p>
                        </a>
                    </li>
										{isAuthenticated()?
                    (<li class={location.pathname.includes('appointments')?"nav-item active":"nav-item"}>
                        <a class="nav-link" href="/appointments">
                            <i class="material-icons">notifications</i>
                            <p>Appointments</p>
                        </a>
                    </li>):null}
                </ul>
            </div>
        </div>
	}
}

export default SideBar;
