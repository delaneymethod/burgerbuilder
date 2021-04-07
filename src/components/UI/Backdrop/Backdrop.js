import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Backdrop.module.css';

// MAYBE - This could be a functional component
class Backdrop extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return this.props.show ? (
			<div
				className={classes.Backdrop}
				onClick={this.props.onClick}
			/>
		) : null;
	};
}

Backdrop.propTypes = {
	show: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Backdrop;
