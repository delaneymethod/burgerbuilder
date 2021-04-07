import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './SideDrawerToggle.module.css';

// MAYBE - This could be a functional component
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
				<div/>
				<div/>
				<div/>
			</div>
		);
	};
}

SideDrawerToggle.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default SideDrawerToggle;
