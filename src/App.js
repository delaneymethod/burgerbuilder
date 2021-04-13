import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authenticateAuto } from './store/actions';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authenticate from './containers/Authenticate/Authenticate';
import Logout from './containers/Authenticate/Logout/Logout';

class App extends Component {
	componentWillMount = () => {
		this.props.authenticateAuto();
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let routes = (
			<Switch>
				<Route path={'/authenticate'} component={Authenticate}/>
				<Route path={'/'} exact component={BurgerBuilder}/>
				<Redirect to={'/'}/>
			</Switch>
		);

		if (this.props.authenticated) {
			routes = (
				<Switch>
					<Route path={'/authenticate'} component={Authenticate}/>
					<Route path={'/checkout'} component={Checkout}/>
					<Route path={'/orders'} component={Orders}/>
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
