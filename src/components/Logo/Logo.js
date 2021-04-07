import React, { Component } from 'react';

import classes from './Logo.module.css';

import burgerLogo from '../../assets/images/burger-logo.png';

// MAYBE - This could be a functional component
class Logo extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.Logo}>
				<img
					src={burgerLogo}
					alt={'The Burger Builder (Basic Version)'}
				/>
			</div>
		);
	};
}

export default Logo;
