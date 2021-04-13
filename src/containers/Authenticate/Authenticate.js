import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from  'react-router-dom';
import PropTypes from 'prop-types';

import classes from './Authenticate.module.css';

import { authenticate, authenticateRedirectPath } from '../../store/actions';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateForm } from '../../shared/utility';

class Authenticate extends Component {
	/**
	 * @type {{formIsValid: boolean, isSignUp: boolean, form: {password: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, errorMessage: string, required: boolean}}, email: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, isEmail: boolean, errorMessage: string, required: boolean}}}}}
	 */
	state = {
		formIsValid: false,
		isSignUp: true,
		form: {
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

		for (const formElementId in this.state.form) {
			formData[formElementId] = this.state.form[formElementId].value;
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
	 * @param event
	 * @param inputId
	 */
	updateField = (event, inputId) => {
		const { updatedForm: form, formIsValid } = updateForm(event, this.state.form, inputId);

		this.setState({ form, formIsValid });
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const formElements = [];

		for (const key in this.state.form) {
			formElements.push({
				id: key,
				config: this.state.form[key]
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
						onChange={event => this.updateField(event, formElement.id)}
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

Authenticate.propTypes = {
	error: PropTypes.bool,
	loading: PropTypes.bool.isRequired,
	building: PropTypes.bool.isRequired,
	authenticated: PropTypes.bool.isRequired,
	authenticateRedirectPath:PropTypes.string.isRequired,
	authenticate: PropTypes.func.isRequired,
	resetAuthenticateRedirectPath: PropTypes.func.isRequired
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
