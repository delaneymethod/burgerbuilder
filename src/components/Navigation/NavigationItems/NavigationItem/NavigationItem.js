import React, { Component } from 'react';

import classes from './NavigationItem.module.css';

class NavigationItem extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<li className={classes.NavigationItem}>
				<a
					href={this.props.href}
					title={this.props.children}
					className={this.props.active ? classes.active : null}
				>
					{this.props.children}
				</a>
			</li>
		);
	};
}

export default NavigationItem;
