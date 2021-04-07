import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

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

NavigationItem.propTypes = {
	active: PropTypes.bool,
	href: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired
};

export default NavigationItem;
