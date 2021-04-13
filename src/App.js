import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
		return (
			<Layout>
				<Switch>
					<Route path={'/checkout'} component={Checkout}/>
					<Route path={'/orders'} component={Orders}/>
					<Route path={'/authenticate'} component={Authenticate}/>
					<Route path={'/logout'} component={Logout}/>
					<Route path={'/'} exact component={BurgerBuilder}/>
				</Switch>
			</Layout>
		);
	};
}

/**
 * @param dispatch
 * @returns {{authenticateAuto: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		authenticateAuto: () => dispatch(authenticateAuto())
	};
};

export default withRouter(connect(null, mapDispatchToProps)(App));
