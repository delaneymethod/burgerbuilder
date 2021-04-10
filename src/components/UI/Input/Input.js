import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Input.module.css';

// MAYBE - This could be a functional component
class Input extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let inputElement;

		const inputClasses = [classes.InputElement];

		if (this.props.shouldValidate && this.props.touched && !this.props.isValid) {
			inputClasses.push(classes.InValid);
		}

		switch (this.props.elementType) {
			case 'textarea':
				inputElement = <textarea
					className={inputClasses.join(' ')}
					value={this.props.value}
					onChange={this.props.onChange}
					{...this.props.elementConfig}
				/>;
				break;

			case 'select':
				inputElement = <select
					className={inputClasses.join(' ')}
					onChange={this.props.onChange}
				>
					{this.props.elementConfig.options.map(option => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.displayValue}
						</option>
					))}
				</select>;
				break;

			default:
				inputElement = <input
					className={inputClasses.join(' ')}
					onChange={this.props.onChange}
					value={this.props.value}
					{...this.props.elementConfig}
				/>;
		}

		let validationError = null;

		if (this.props.touched && !this.props.isValid) {
			validationError = <p className={classes.ValidationError}>{this.props.shouldValidate.errorMessage}</p>;
		}

		return (
			<div className={classes.Input}>
				<label className={classes.Label}>{this.props.label}</label>
				{inputElement}
				{validationError}
			</div>
		);
	};
}

Input.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	isValid: PropTypes.bool,
	touched: PropTypes.bool,
	shouldValidate: PropTypes.any,
	label: PropTypes.string.isRequired,
	elementType: PropTypes.string.isRequired,
	elementConfig: PropTypes.shape({
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			displayValue: PropTypes.string.isRequired
		})),
		type: PropTypes.string,
		placeholder: PropTypes.string
	}).isRequired
};

export default Input;
