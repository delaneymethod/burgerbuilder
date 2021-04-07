import React, { Component } from 'react';

import classes from './SideDrawerToggle.module.css';

class SideDrawerToggle extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div
				className={classes.SideDrawerToggle}
				onClick={this.props.onClick}
			>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	};
}

export default SideDrawerToggle;
