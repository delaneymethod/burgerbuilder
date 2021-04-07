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
			<div
				className={
					[
						classes.Button,
						classes[this.props.type]
					].join(' ')
				}
				onClick={this.props.onClick}
			>
				{this.props.children}
			</div>
		);
	};
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired
};

export default Button;
