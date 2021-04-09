import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axiosIntance';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		fullName: '',
		email: '',
		postalAddress: {
			streetLine1: '',
			streetLine2: '',
			city: '',
			postalCode: '',
			country: ''
		},
		error: null,
		showError: false,
		loading: false
	};

	/**
	 * @param event
	 */
	orderNow = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const order = {
			totalPrice: this.props.totalPrice,
			ingredients: this.props.ingredients,
			customer: {
				fullName: 'Sean Delaney',
				email: 'hello@delaneymethod.com',
				postalAddress: {
					streetLine1: 'Test Street Line 1',
					streetLine2: 'Test Street Line 2',
					city: 'Test City',
					postalCode: 'Test Postal Code',
					country: 'United Kingdom'
				}
			},
			deliveryMethod: 'standard'
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
	 * @returns {JSX.Element}
	 */
	render() {
		let form = (
			<form>
				<Input label={'Full Name'} type={'text'} name={'fullName'} placeholder={'e.g. Sean Delaney'}/>
				<Input label={'Street Line 1'} type={'text'} name={'streetLine1'} placeholder={'Enter your street line 1 here'}/>
				<Input label={'Street Line 2'} type={'text'} name={'streetLine2'} placeholder={'Enter your street line 2 here'}/>
				<Input label={'City'} type={'text'} name={'city'} placeholder={'e.g. Bishopton'}/>
				<Input label={'Postal Code'} type={'text'} name={'postalCode'} placeholder={'Enter your postal code here'}/>
				<Input label={'Country'} type={'text'} name={'country'} placeholder={'e.g. Scotland'}/>
				<Input label={'Email'} type={'email'} name={'email'} placeholder={'e.g. hello@delaneymethod.com'}/>
				<Button
					type={'Success'}
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
