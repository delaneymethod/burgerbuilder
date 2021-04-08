import React, { Component } from 'react';

import classes from './Spinner.module.css';

class Spinner extends Component {
	render() {
		return (
			<div className={classes.Loader}>Loading...</div>
		);
	};
}

export default Spinner;
