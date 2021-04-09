import React, { Component } from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

// MAYBE - This could be a functional component
class NavigationItems extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem
					exact
					to={'/'}
				>
					Burger Builder
				</NavigationItem>
				<NavigationItem to={'/orders'}>Orders</NavigationItem>
			</ul>
		);
	};
}

export default NavigationItems;
