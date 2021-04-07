import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<Layout>
				<BurgerBuilder/>
			</Layout>
		);
	};
}

export default App;
