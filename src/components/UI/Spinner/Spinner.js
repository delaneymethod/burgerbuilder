import React, { Component } from 'react';

import classes from './Spinner.module.css';

class Spinner extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.Loader}/>
		);
	};
}

export default Spinner;
