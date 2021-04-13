import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from  'react-router-dom';

import classes from './Authenticate.module.css';

import { authenticate, authenticateRedirectPath } from '../../store/actions';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Authenticate extends Component {
	state = {
		isSignUp: true,
		// TODO - Rename to form
		authenticateForm: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'e.g. hello@delaneymethod.com'
				},
				label: 'Email',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					isEmail: true,
					errorMessage: 'Please enter a valid email'
				},
				isValid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'e.g. password'
				},
				label: 'Password',
				value: '',
				validation: {
					required: true,
					minLength: 7,
					errorMessage: 'Please enter a valid password'
				},
				isValid: false,
				touched: false
			}
		}
	};

	componentDidMount = () => {
		if (!this.props.building && this.props.authenticateRedirectPath !== '/') {
			this.props.resetAuthenticateRedirectPath('/');
		}
	};

	/**
	 * @param event
	 */
	authenticate = event => {
		event.preventDefault();

		const formData = {};

		for (const formElementId in this.state.authenticateForm) {
			formData[formElementId] = this.state.authenticateForm[formElementId].value;
		}

		formData.returnSecureToken = true;
		formData.action = (this.state.isSignUp) ? 'signUp' : 'signInWithPassword';

		this.props.authenticate(formData);
	};

	switchAuthenticationMode = () => {
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp
			};
		});
	};

	/**
	 * @param value
	 * @param rules
	 * @returns {boolean}
	 */
	checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules || !rules.required) {
			return isValid;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

			isValid = pattern.test(value) && isValid;
		}

		/*
		if (rules.isNumeric) {
			const pattern = /^\d+$/;

			isValid = pattern.test(value) && isValid;
		}
		*/

		return isValid;
	};

	/**
	 * @param event
	 * @param inputId
	 */
	changed = (event, inputId) => {
		const updatedAuthenticateForm = {
			...this.state.authenticateForm
		};

		const updatedFormElement = {
			...updatedAuthenticateForm[inputId]
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;

		updatedAuthenticateForm[inputId] = updatedFormElement;

		let formIsValid = true;

		for (const input in updatedAuthenticateForm) {
			if (!updatedAuthenticateForm[input].validation || !updatedAuthenticateForm[input].validation.required) {
				continue;
			}

			formIsValid = updatedAuthenticateForm[input].isValid && formIsValid;
		}

		this.setState({ authenticateForm: updatedAuthenticateForm, formIsValid });
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const formElements = [];

		for (const key in this.state.authenticateForm) {
			formElements.push({
				id: key,
				config: this.state.authenticateForm[key]
			});
		}

		let form = (
			<form onSubmit={this.authenticate}>
				{formElements.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						label={formElement.config.label}
						isValid={formElement.config.isValid}
						onChange={event => this.changed(event, formElement.id)}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
					/>
				))}
				<Button
					type={'submit'}
					className={'Success'}
					disabled={!this.state.formIsValid}
					onClick={this.authenticate}
				>
					{this.state.isSignUp ? 'Sign Up' : 'Sign In'}
				</Button>
				<Button
					type={'button'}
					className={'Danger'}
					onClick={this.switchAuthenticationMode}
				>
					{this.state.isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner/>;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error}</p>;
		}

		let authenticateRedirect = null;

		if (this.props.authenticated) {
			authenticateRedirect = <Redirect to={this.props.authenticateRedirectPath}/>;
		}

		return (
			<div className={classes.Authenticate}>
				{authenticateRedirect}
				{errorMessage}
				{form}
			</div>
		);
	};
}

// FIXME
Authenticate.propTypes = {

};

/**
 * @param state
 * @returns {{authenticated: boolean, error, loading, building: (boolean|*), authenticateRedirectPath: (string|*)}}
 */
const mapStateToProps = state => {
	return {
		error: state.authenticate.error,
		loading: state.authenticate.loading,
		building: state.burgerBuilder.building,
		authenticated: state.authenticate.idToken !== null,
		authenticateRedirectPath: state.authenticate.authenticateRedirectPath
	};
};

/**
 * @param dispatch
 * @returns {{authenticate: (function(*=): *), resetAuthenticateRedirectPath: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		authenticate: authenticateData => dispatch(authenticate(authenticateData)),
		resetAuthenticateRedirectPath: path => dispatch(authenticateRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
