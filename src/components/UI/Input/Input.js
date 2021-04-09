import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Input.module.css';

import Label from '../Label/Label';

// MAYBE - This could be a functional component
class Input extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.Input}>
				<Label>{this.props.label}</Label>
				<input
					type={this.props.type}
					name={this.props.name}
					placeholder={this.props.placeholder}
				/>
			</div>
		);
	};
}

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
};

export default Input;
