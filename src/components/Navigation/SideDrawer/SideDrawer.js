import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

// MAYBE - This could be a functional component
class SideDrawer extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let attachedClasses = [classes.SideDrawer, classes.Closed];

		if (this.props.show) {
			attachedClasses = [classes.SideDrawer, classes.Open];
		}

		return (
			<Aux>
				<Backdrop
					show={this.props.show}
					onClick={this.props.onClickSideDrawerBackdrop}
				/>
				<div className={attachedClasses.join(' ')}>
					<div className={classes.Logo}>
						<Logo/>
					</div>
					<nav>
						<NavigationItems/>
					</nav>
				</div>
			</Aux>
		);
	};
}

SideDrawer.propTypes = {
	show: PropTypes.bool.isRequired,
	onClickSideDrawerBackdrop: PropTypes.func.isRequired
};

export default SideDrawer;
