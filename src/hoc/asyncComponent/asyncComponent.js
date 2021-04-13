import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
	return class extends Component {
		/**
		 * @type {{component: null}}
		 */
		state = {
			component: null
		};

		componentDidMount = () => {
			importComponent().then(component => {
				this.setState({ component: component.default });
			});
		};

		/**
		 * @returns {JSX.Element|null}
		 */
		render() {
			const Component = this.state.component;

			return Component ? <Component {...this.props}/> : null;
		};
	};
};

export default asyncComponent;
