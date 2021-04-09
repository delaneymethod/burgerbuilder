import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Label.module.css';

// MAYBE - This could be a functional component
class Label extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return <label className={classes.Label}>{this.props.children}</label>;
	};
}

Label.propTypes = {
	children: PropTypes.string.isRequired,
};

export default Label;
