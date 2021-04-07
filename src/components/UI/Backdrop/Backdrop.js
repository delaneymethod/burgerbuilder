import React, { Component } from 'react';

import classes from './Backdrop.module.css';

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

export default Backdrop;
