import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Layout.module.css';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
				<Toolbar
					authenticated={this.props.authenticated}
					onClickToolbarSideDrawerToggle={this.toggleSideDrawer}
				/>
				<SideDrawer
					show={this.state.showSideDrawer}
					authenticated={this.props.authenticated}
					onClickSideDrawerBackdrop={this.closeSideDrawer}
				/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	};
}

Layout.propTypes = {
	children: PropTypes.any.isRequired
};

/**
 * @param state
 * @returns {{authenticated: boolean}}
 */
const mapStateToPropsFactory = state => {
	return {
		authenticated: state.authenticate.idToken !== null
	};
};

export default connect(mapStateToPropsFactory)(Layout);
