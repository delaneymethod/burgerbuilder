import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

// MAYBE - This could be a functional component
class NavigationItem extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<li className={classes.NavigationItem}>
				<NavLink
					to={this.props.to}
					exact={this.props.exact}
					activeClassName={classes.active}
				>
					{this.props.children}
				</NavLink>
			</li>
		);
	};
}

NavigationItem.propTypes = {
	to: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	children: PropTypes.string.isRequired
};

export default NavigationItem;
