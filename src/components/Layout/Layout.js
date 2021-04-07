import React, { Component } from 'react';

import classes from './Layout.module.css';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: true
	};

	openSideDrawer = () => {
		this.setState({ showSideDrawer: true });
	};

	closeSideDrawer = () => {
		this.setState({ showSideDrawer: false });
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<Aux>
				<Toolbar/>
				<SideDrawer
					show={this.state.showSideDrawer}
					onClickSideDrawerBackdrop={this.closeSideDrawer}
				/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	};
}

export default Layout;
