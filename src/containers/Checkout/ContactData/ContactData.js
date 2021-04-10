import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axiosIntance';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	/**
	 * @type {{orderForm: {streetLine2: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, streetLine1: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, country: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, city: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, deliveryMethod: {elementConfig: {options: [{displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}]}, label: string, elementType: string, value: string}, postalCode: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, fullName: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, email: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}}, showError: boolean, error: null, loading: boolean}}
	 */
	state = {
		error: null,
		showError: false,
		loading: false,
		formIsValid: false,
		orderForm: {
			fullName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'e.g. Sean Delaney'
				},
				label: 'Full Name',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					errorMessage: 'Please enter a valid full name'
				},
				isValid: false,
				touched: false
			},
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
					errorMessage: 'Please enter a valid email'
				},
				isValid: false,
				touched: false
			},
			streetLine1: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter your street line 1 here'
				},
				label: 'Street Line 1',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					errorMessage: 'Please enter a valid street line 1'
				},
				isValid: false,
				touched: false
			},
			streetLine2: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter your street line 2 here'
				},
				label: 'Street Line 2',
				value: '',
				validation: {
					required: false,
					minLength: 3,
					errorMessage: 'Please enter a valid street line 2'
				},
				isValid: false,
				touched: false
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'e.g. Bishopton'
				},
				label: 'City',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					errorMessage: 'Please enter a valid city'
				},
				isValid: false,
				touched: false
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter your postal code here'
				},
				label: 'Postal Code',
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 7,
					errorMessage: 'Please enter a valid postal code'
				},
				isValid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'e.g. Scotland'
				},
				label: 'Country',
				value: ''
				/*
				,
				validation: {
					required: false,
					minLength: 3,
					errorMessage: 'Please enter a valid country'
				},
				isValid: false,
				touched: false
				*/
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '', displayValue: ''},
						{ value: 'standard', displayValue: 'Standard'},
						{ value: 'express', displayValue: 'Express'}
					]
				},
				label: 'Delivery Method',
				value: '', // If we didnt have an empty option, setting value to standard
				validation: {
					required: true,
					errorMessage: 'Please select a valid delivery method'
				},
				isValid: false,
				touched: false
			}
		}
	};

	/**
	 * @param event
	 */
	orderNow = event => {
		event.preventDefault();

		this.setState({ loading: true });

		const formData = {};

		for (const formElementId in this.state.orderForm) {
			formData[formElementId] = this.state.orderForm[formElementId].value;
		}

		const order = {
			orderData: formData,
			totalPrice: this.props.totalPrice,
			ingredients: this.props.ingredients
		};

		axiosInstance
			.post('/orders.json', order)
			.then(() => {
				this.setState({
					loading: false
				});

				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({
					error,
					showError: true,
					loading: false
				});
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

		return isValid;
	};

	/**
	 * @param event
	 * @param inputId
	 */
	changed = (event, inputId) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};

		const updatedFormElement = {
			...updatedOrderForm[inputId]
		};

		updatedFormElement.value = event.target.value;
		updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;

		updatedOrderForm[inputId] = updatedFormElement;

		let formIsValid = true;

		for (const input in updatedOrderForm) {
			if (!updatedOrderForm[input].validation || !updatedOrderForm[input].validation.required) {
				continue;
			}

			formIsValid = updatedOrderForm[input].isValid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid });
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const formElements = [];

		for (const key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderNow}>
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
					type={'Success'}
					disabled={!this.state.formIsValid}
					onClick={event => this.orderNow(event)}
				>
					Order Now
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner/>;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Please enter your contact details</h4>
				{form}
			</div>
		);
	};
}

export default ContactData;
