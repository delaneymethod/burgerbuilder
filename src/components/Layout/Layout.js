import React, { Component } from 'react';

import classes from './Layout.module.css';

import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	/**
	 * @type {{showSideDrawer: boolean}}
	 */
	state = {
		showSideDrawer: false
	};

	openSideDrawer = () => {
		this.setState({ showSideDrawer: true });
	};

	closeSideDrawer = () => {
		this.setState({ showSideDrawer: false });
	};

	toggleSideDrawer = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<Aux>
				<Toolbar onClickToolbarSideDrawerToggle={this.toggleSideDrawer}/>
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
