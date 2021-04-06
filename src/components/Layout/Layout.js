import React, { Component } from 'react';

import classes from './Layout.module.css';

import Aux from '../../hoc/Aux/Aux';

class Layout extends Component {
	render() {
		return (
			<Aux>
				<div>Toolbar, SideDrawer, Backdrop</div>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	};
}

export default Layout;
