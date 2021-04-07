import React, { Component } from 'react';

import classes from './Button.module.css';

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

export default Button;
