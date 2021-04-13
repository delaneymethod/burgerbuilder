import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

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
				{this.props.authenticated
					? (
						<Aux>
							<NavigationItem to={'/orders'}>Orders</NavigationItem>
							<NavigationItem to={'/logout'}>Logout</NavigationItem>
						</Aux>
					)
					: <NavigationItem to={'/authenticate'}>Authenticate</NavigationItem>
				}
			</ul>
		);
	};
}

NavigationItems.propTypes = {
	authenticated: PropTypes.bool.isRequired
};

export default NavigationItems;
