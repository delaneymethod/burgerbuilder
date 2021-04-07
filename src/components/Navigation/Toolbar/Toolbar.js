import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

// MAYBE - This could be a functional component
class Toolbar extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<header className={classes.Toolbar}>
				<SideDrawerToggle onClick={this.props.onClickToolbarSideDrawerToggle}/>
				<div className={classes.Logo}>
					<Logo/>
				</div>
				<nav className={classes.DesktopOnly}>
					<NavigationItems/>
				</nav>
			</header>
		);
	};
}

Toolbar.propTypes = {
	onClickToolbarSideDrawerToggle: PropTypes.func.isRequired
};

export default Toolbar;
