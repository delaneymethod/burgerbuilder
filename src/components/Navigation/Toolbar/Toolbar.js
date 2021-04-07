import React, { Component } from 'react';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

class Toolbar extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<header className={classes.Toolbar}>
				<div>MENU</div>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav className={classes.DesktopOnly}>
					<NavigationItems/>
				</nav>
			</header>
		);
	};
}

export default Toolbar;
