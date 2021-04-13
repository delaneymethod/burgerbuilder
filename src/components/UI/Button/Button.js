import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Button.module.css';

// MAYBE - This could be a functional component
class Button extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<button
				type={this.props.type}
				className={
					[
						classes.Button,
						classes[this.props.className]
					].join(' ')
				}
				onClick={this.props.onClick}
				disabled={this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	};
}

Button.propTypes = {
	disabled: PropTypes.bool,
	type: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired
};

export default Button;
