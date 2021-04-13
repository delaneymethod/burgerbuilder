import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authenticate from './containers/Authenticate/Authenticate';

class App extends Component {
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
					<Route path={'/'} exact component={BurgerBuilder}/>
				</Switch>
			</Layout>
		);
	};
}

export default App;
