import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authenticateAuto } from './store/actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Authenticate/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

class App extends Component {
	componentWillMount = () => {
		this.props.authenticateAuto();
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const AsyncCheckout = asyncComponent(() => {
			return import('./containers/Checkout/Checkout');
		});

		const AsyncOrders = asyncComponent(() => {
			return import('./containers/Orders/Orders');
		});

		const AsyncAuthenticate = asyncComponent(() => {
			return import('./containers/Authenticate/Authenticate');
		});

		let routes = (
			<Switch>
				<Route path={'/authenticate'} component={AsyncAuthenticate}/>
				<Route path={'/'} exact component={BurgerBuilder}/>
				<Redirect to={'/'}/>
			</Switch>
		);

		if (this.props.authenticated) {
			routes = (
				<Switch>
					<Route path={'/authenticate'} component={AsyncAuthenticate}/>
					<Route path={'/checkout'} component={AsyncCheckout}/>
					<Route path={'/orders'} component={AsyncOrders}/>
					<Route path={'/logout'} component={Logout}/>
					<Route path={'/'} exact component={BurgerBuilder}/>
					<Redirect to={'/'}/>
				</Switch>
			);
		}

		return (
			<Layout>
				{routes}
			</Layout>
		);
	};
}

/**
 * @param state
 * @returns {{authenticated: boolean}}
 */
const mapStateToProps = state => {
	return {
		authenticated: state.authenticate.idToken !== null
	};
};

/**
 * @param dispatch
 * @returns {{authenticateAuto: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		authenticateAuto: () => dispatch(authenticateAuto())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
