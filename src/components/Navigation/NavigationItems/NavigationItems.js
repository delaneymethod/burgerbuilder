import React, { Component } from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem
					href={'/'}
					active
				>
					Burger Builder
				</NavigationItem>
				<NavigationItem href={'/checkout'}>
					Checkout
				</NavigationItem>
			</ul>
		);
	};
}

export default NavigationItems;
