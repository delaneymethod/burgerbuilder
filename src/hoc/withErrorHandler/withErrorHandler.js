import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class Wrapped extends Component {
		/**
		 * @type {{showError: boolean, error: null}}
		 */
		state = {
			error: null,
			showError: false
		};

		componentDidMount = () => {
			axios.interceptors.request.use(request => {
				this.setState({
					error: null,
					showError: false
				});

				return request;
			}, error => {
				this.setState({
					error,
					showError: true
				});
			});

			axios.interceptors.response.use(response => response, error => {
				this.setState({
					error,
					showError: true
				});
			});
		};

		resetError = () => this.setState({
			error: false,
			showError: false
		});

		/**
		 * @returns {JSX.Element}
		 */
		render() {
			return (
				<Aux>
					<Modal
						show={this.state.showError}
						onClickModalBackdrop={this.resetError}
					>
						{this.state.error ? <p>{this.state.error.message}</p> : <div/>}
					</Modal>
					<WrappedComponent {...this.props}/>
				</Aux>
			);
		};
	};
};

export default withErrorHandler;
