import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
	return class extends Component {
		/**
		 * @type {number}
		 */
		requestInterceptor = 0;

		/**
		 * @type {number}
		 */
		responseInterceptor = 0;

		/**
		 * @type {{showError: boolean, error: null}}
		 */
		state = {
			error: null,
			showError: false
		};

		componentWillMount = () => {
			this.requestInterceptor = axiosInstance.interceptors.request.use(request => {
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

			this.responseInterceptor = axiosInstance.interceptors.response.use(response => response, error => {
				this.setState({
					error,
					showError: true
				});
			});
		};

		componentWillUnmount = () => {
			axiosInstance.interceptors.request.eject(this.requestInterceptor);
			axiosInstance.interceptors.response.eject(this.responseInterceptor);
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
